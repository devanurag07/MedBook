# README #

This README would normally document whatever steps are necessary to get your application up and running.

### What is this repository for? ###

* Quick summary
* Version
* [Learn Markdown](https://bitbucket.org/tutorials/markdowndemo)

### How do I get set up? ###

* Summary of set up
* Configuration:
    Project setup    
        Custom installation:
            Reset API:
                -> go into django dir
                -> virtualenv -p python3 qmenv
                -> source qmenv/bin/activate
                -> pip install -r requirements
                -> configure database name, user, password in qm/access.py
                    DATABASES = {
                        'default': {
                            'NAME': 'your database name',
                            'USER': 'your database username',
                            'PASSWORD': 'your database password',
                        }
                    }
                -> python manage.py migrate
                -> python manage.py runserver 8000
  

* Dependencies:
    Before starting setup make sure that following packages are installed in local machine
    
	    For django:
	        -> apt-get install python-pip
	        -> apt-get install mysql-server
	        -> apt-get install mysql-client
	        -> apt-get install python3-dev
            -> apt-get install virtualenv
	        -> pip install virtualenv
                -> If you got fail mysql installtion like(Command "python setup.py egg_info" failed with error code 1 in /tmp/pip-build-n3hm_k01/mysql-python/)
                     -> sudo apt-get install python-dev python3-dev
		     -> sudo apt-get install libmysqlclient-dev
             -> Apache related depencency https://stackoverflow.com/a/49999585/7261317
             
* Database configuration
        Creating predefined roles:
            -> Predefined roles will be created automatically during migration
            -> For dev mode run this command `django/migrate.py updateroles` within the virtualenv to update predefined roles and their permissions
            -> Don't update predefined roles in production mode
            

### Contribution guidelines ###

* Writing tests
* Code review
* Other guidelines

### Who do I talk to? ###

* Repo owner or admin
* Other community or team contact


#For Background process rabbitmq
  rabbitmq install:
    https://www.rabbitmq.com/install-debian.html
