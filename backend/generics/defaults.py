from django.contrib.auth.models import ContentType, Permission


class AppDefaults:
    access_specifiers = None

    @classmethod
    def get_predefined_roles(cls):
        """ Returns predefined role alias and its names """
        return {
            'Admin': 'Predefined/Admin',
            'Doctors': 'Predefined/Doctors',
            'Customers': 'Predefined/Customers',
            'Users': 'Predefined/Users'
        }

    @classmethod
    def get_predefined_role_access_specifiers(cls, role_alias):
        """ Returns list of access specifiers for the requesting role alias """
        cls.__init__()

        specifiers_of_predefined_roles = {
            'Admin': list(cls.access_specifiers.keys()),
            'Doctors': list(cls.access_specifiers.keys()),
            'Customers': [
                "view#users",
            ],
            'Users': [
                "view#users",
            ]
            # Admin role permission will be added by setting user as superuser

        }
        return specifiers_of_predefined_roles[role_alias]

    @classmethod
    def get_access_specifier_permissions(cls, access):
        """ Returns list of permission ids for the requested access specifier """
        cls.__init__()

        specifier_permissions = []

        if access in cls.access_specifiers.keys():
            specifier_permissions = list(set([item for sublist in cls.access_specifiers[access] for item in sublist]))

        return specifier_permissions, 'permissions'

    @classmethod
    def get_all_permissions(cls, app_label, model):
        """ Returns list of permission ids corresponding to the model """
        return list(
            Permission.objects.filter(content_type__app_label=app_label, content_type__model=model).values_list('id',
                                                                                                                flat=True))

    @classmethod
    def get_permissions(cls, app_label, model_name, codename_list):
        """ Returns list od permission ids of provided code names """
        return list(Permission.objects.filter(content_type__app_label=app_label, content_type__model=model_name,
                                              codename__in=codename_list).values_list('id', flat=True))

    @classmethod
    def __init__(cls):
        """ Providing values for class variables """

        if cls.access_specifiers is None:
            cls.access_specifiers = {
                # Users
                "add#users": [
                    cls.get_permissions(app_label='users', model_name='qmuser',
                                        codename_list=['add_qmuser']
                                        )
                ],
                "view#users": [
                    cls.get_permissions(app_label='users', model_name='qmuser',
                                        codename_list=['view_qmuser']
                                        )
                ],
                "edit#users": [
                    cls.get_permissions(app_label='users', model_name='qmuser',
                                        codename_list=['change_qmuser'])
                ],
                "delete#users": [
                    cls.get_permissions(app_label='users', model_name='qmuser',
                                        codename_list=['delete_qmuser'])
                ],

                # Roles
                "add#roles": [
                    cls.get_permissions(app_label='auth', model_name='group',
                                        codename_list=['add_group']
                                        ),
                    cls.get_permissions(app_label='users', model_name='roles',
                                        codename_list=['add_roles']
                                        )
                ],
                "view#roles": [
                    cls.get_permissions(app_label='auth', model_name='group',
                                        codename_list=['view_group']
                                        ),
                    cls.get_permissions(app_label='users', model_name='roles',
                                        codename_list=['view_roles']
                                        )
                ],
                "edit#roles": [
                    cls.get_permissions(app_label='auth', model_name='group',
                                        codename_list=['change_group']),
                    cls.get_permissions(app_label='users', model_name='roles',
                                        codename_list=['change_roles'])
                ],
                "delete#roles": [
                    cls.get_permissions(app_label='auth', model_name='group',
                                        codename_list=['delete_group']),
                    cls.get_permissions(app_label='users', model_name='roles',
                                        codename_list=['delete_roles'])
                ]

            }
