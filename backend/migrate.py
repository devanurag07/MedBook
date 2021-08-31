#!/usr/bin/env python
import sys
import os
from qm.settings import PROJECT_APPS


def migrate():
    apps = PROJECT_APPS.copy()

    apps_formatted = list()

    for app in apps:
        splitted = app.split('.')
        apps_formatted.append(splitted[len(splitted)-1])

    status = os.system('python manage.py makemigrations common %s' % ' '.join(apps_formatted))

    if status == 0:
        os.system('python manage.py migrate')


def create_or_update_roles(role_name=None):
    """
        This takes care of defining and creating or updating set of predefined roles like partner_role
    """

    from django.contrib.auth.models import Permission
    from django.contrib.contenttypes.models import ContentType
    from generics.defaults import AppDefaults
    from users.models import Roles

    if ContentType.objects.filter(app_label='auth', model='group').exists() and ContentType.objects.filter(
            app_label='users', model='roles').exists():

        predefined_roles = dict()
        if role_name:
            predefined_roles[role_name] = AppDefaults.get_predefined_roles().get(role_name, None)
        else:
            predefined_roles = AppDefaults.get_predefined_roles()

        for role_alias, role_name in predefined_roles.items():
            group_model = ContentType.objects.filter(app_label='auth', model='group')[0].model_class()
            access_specifiers = AppDefaults.get_predefined_role_access_specifiers(role_alias=role_alias)

            # Creates new role if not created before
            if not group_model.objects.filter(name=role_name).exists():

                allowed_permissions_sets = [AppDefaults.get_access_specifier_permissions(specifier)[0] for specifier in
                                            access_specifiers]
                allowed_permissions = list(set([item for sublist in allowed_permissions_sets for item in sublist]))

                # Creating Group
                group_instance = group_model.objects.create(name=role_name)
                group_instance.permissions.set(Permission.objects.filter(id__in=allowed_permissions))
                if group_instance.save() is None:
                    print('\033[0;37;42m Generated new role "%s", Applying details... \033[0;37;42m' % role_alias)

                # Creating Role details
                role_instance = Roles.objects.create(
                    group=group_instance,
                    alias=role_alias,
                    accesses=','.join(access_specifiers),
                    description='Predefined role for %s' % role_alias
                )
                if role_instance.save() is None:
                    print('\033[0;36;1m Details applied for role: %s \033[0m' % role_alias)

            # Updates role if already created
            else:
                group_instance = group_model.objects.get(name=role_name)
                assigned_specifiers = group_instance.details.accesses.split(',')
                access_specifiers = list(set(access_specifiers))

                allowed_permissions_sets = [AppDefaults.get_access_specifier_permissions(specifier)[0] for specifier in
                                            access_specifiers]
                allowed_permissions = list(set([item for sublist in allowed_permissions_sets for item in sublist]))

                group_instance.permissions.set(Permission.objects.filter(id__in=allowed_permissions))
                if group_instance.save() is None:
                    print('\033[0;37;42m Updated role "%s", Applying details... \033[0m' % role_alias)

                # Updating Role details
                role_instance = Roles.objects.get(group=group_instance)
                role_instance.alias = role_alias
                role_instance.accesses = ','.join(access_specifiers)
                role_instance.description = 'Predefined role for %s' % role_alias

                if role_instance.save() is None:
                    print('\033[0;36;1m Details applied for role: %s \033[0m' % role_alias)

    else:
        print('\033[0;37;41m---- Error while generating predefined roles --- \033[0m')
        print('\033[0;37;41m -Either auth.group or users.roles model does not exists !!! \033[0m')


if __name__ == "__main__":

    if sys.argv.__len__() == 1:
        migrate()
    else:
        command = sys.argv[1]

        if command == 'updateroles':
            import django
            os.environ.setdefault("DJANGO_SETTINGS_MODULE", "qm.settings")
            django.setup()

            role_name = None

            if sys.argv.__len__() > 2:
                role_name = sys.argv[2]

            create_or_update_roles(role_name=role_name)