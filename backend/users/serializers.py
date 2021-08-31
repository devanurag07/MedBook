from django.contrib.auth.models import Group, Permission
from django.db.models import Q
from rest_framework import serializers

from users.models import QMUser, UserProfile, Roles
from generics.defaults import AppDefaults


class UsersSerializer(serializers.HyperlinkedModelSerializer):
    mobile = serializers.CharField(
        source='profile.mobile', max_length=255, allow_null=True, allow_blank=True)
    permissions = serializers.ListField(
        source='get_all_permissions', read_only=True)
    role_id = serializers.CharField(
        source='profile.role_id', max_length=100, allow_null=True, allow_blank=True)
    address_line1 = serializers.CharField(
        source='profile.address_line1', allow_null=True, allow_blank=True, required=False)
    address_line2 = serializers.CharField(
        source='profile.address_line2', allow_null=True, allow_blank=True, required=False)
    city = serializers.CharField(
        source='profile.city', allow_null=True, allow_blank=True, required=False)
    state = serializers.CharField(
        source='profile.state', allow_null=True, allow_blank=True, required=False)
    country = serializers.CharField(
        source='profile.country', allow_null=True, allow_blank=True, required=False)
    pin_code = serializers.CharField(
        source='profile.country', allow_null=True, allow_blank=True, required=False)
    subscription_active_at = serializers.DateTimeField(
        source='profile.subscription_active_at', allow_null=True, required=False)
    amount = serializers.DecimalField(
        source='profile.amount', allow_null=True, max_digits=15, decimal_places=2, required=False)
    document_verified = serializers.BooleanField(
        source='profile.document_verified', required=False)
    document_rejected = serializers.BooleanField(
        source='profile.document_rejected', required=False)
    clinic_name = serializers.CharField(source='profile.clinic_name', allow_null=True, allow_blank=True,
                                        required=False)
    agreement_file = serializers.FileField(
        source='profile.agreement_file', allow_null=True, required=False)

    def to_representation(self, instance):
        """ Serialize GenericForeignKey field """

        primitive_repr = super(
            UsersSerializer, self).to_representation(instance)
        if 'role_id' in primitive_repr and primitive_repr['role_id'] is not None:
            role_ids = primitive_repr['role_id']
            role_name = []
            for r_id in role_ids.split(','):
                role_instance = Roles.objects.get(id=r_id)
                role_name.append(role_instance.alias)
            primitive_repr['role_name'] = ','.join(map(str, role_name))

        if 'first_name' in primitive_repr and 'last_name' in primitive_repr:
            primitive_repr['full_name'] = '%s %s' % (
                primitive_repr['first_name'], primitive_repr['last_name'])

        return primitive_repr

    class Meta:
        model = QMUser
        fields = (
            'url', 'id', 'username', 'first_name', 'last_name', 'mobile',
            'email', 'permissions', 'role_id', 'is_superuser', 'document_rejected',
            'password', 'address_line1', 'address_line2', 'mobile', 'city',
            'document_verified', 'agreement_file', 'amount', 'clinic_name',
            'state', 'country', 'pin_code', 'subscription_active_at')
        read_only_fields = ['password']

    def create(self, validated_data):
        profile_data = validated_data.pop('profile', None)
        user = super(UsersSerializer, self).create(validated_data)
        user.save()
        profile_data['created_by'] = self.context['request'].user
        self.create_or_update_profile(user, profile_data)
        return user

    def update(self, instance, validated_data):
        profile_data = validated_data.pop('profile', None)
        self.create_or_update_profile(instance, profile_data)
        return super(UsersSerializer, self).update(instance, validated_data)

    def create_or_update_profile(self, user, profile_data):
        profile, created = UserProfile.objects.get_or_create(
            user=user, defaults=profile_data)
        if not created and profile_data is not None:
            super(UsersSerializer, self).update(profile, profile_data)
        if profile_data['role_id']:
            permission_groups = Group.objects.filter(
                id__in=profile_data['role_id'].split(','))
        else:
            permission_groups = Group.objects.filter(id=7)
        user.is_superuser = False
        user.groups.set(permission_groups)
        user.save()


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    alias = serializers.CharField(source='details.alias', max_length=50)
    created_by = serializers.CharField(
        source='details.created_by', read_only=True)
    accesses = serializers.CharField(
        source='details.accesses', allow_null=True)
    description = serializers.CharField(
        source='details.description', allow_null=True)
    created_at = serializers.DateTimeField(
        source='details.created_at', read_only=True)
    modified_at = serializers.DateTimeField(
        source='details.modified_at', read_only=True)

    class Meta:
        model = Group
        fields = ('url', 'id', 'name', 'alias', 'accesses',
                  'created_by', 'description', 'created_at', 'modified_at')
        read_only_fields = ['name']

    def create(self, validated_data):
        details_data = validated_data.pop('details', None)
        # Defining Group name
        if self.context['request'].user.is_superuser and details_data[
                'alias'] in AppDefaults.get_predefined_roles().keys():
            validated_data['name'] = AppDefaults.get_predefined_roles()[
                details_data['alias']]
        else:
            validated_data['name'] = self.context['request'].user.username + \
                '/' + details_data['alias']

        group = super(GroupSerializer, self).create(validated_data)
        group.save()
        details_data['created_by'] = self.context['request'].user
        self.create_or_update_details(group, details_data)
        group = self.add_or_update_permissions(group, details_data['accesses'])
        return group

    def update(self, instance, validated_data):
        details_data = validated_data.pop('details', None)
        # Defining Group name
        if 'alias' in details_data.keys():
            if self.context['request'].user.is_superuser and details_data[
                    'alias'] in AppDefaults.get_predefined_roles().keys():
                validated_data['name'] = AppDefaults.get_predefined_roles()[
                    details_data['alias']]
            else:
                validated_data['name'] = self.context['request'].user.username + \
                    '/' + details_data['alias']

        self.create_or_update_details(instance, details_data)
        instance = self.add_or_update_permissions(
            instance, details_data['accesses'])
        return super(GroupSerializer, self).update(instance, validated_data)

    def create_or_update_details(self, group, details_data):
        details, created = Roles.objects.get_or_create(
            group=group, defaults=details_data)
        if not created and details_data is not None:
            super(GroupSerializer, self).update(details, details_data)

    def add_or_update_permissions(self, group, accesses):
        allowed_permissions = []

        if accesses is not None:
            permitted_accesses = accesses.split(',')
            content_types_list = []
            permissions_list = []
            for access in permitted_accesses:
                array, permission_level = AppDefaults.get_access_specifier_permissions(
                    access)
                if permission_level == 'content_types':
                    content_types_list += array
                elif permission_level == 'permissions':
                    permissions_list += array
            allowed_permissions = Permission.objects.filter(
                Q(id__in=permissions_list) | Q(content_type__in=content_types_list))

        group.permissions.set(allowed_permissions)
        return group
