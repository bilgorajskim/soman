from django.apps import AppConfig


class MenuConfig(AppConfig):
    name = 'soman.menu'
    verbose_name = "Menu"

    def ready(self):
        """Override this to put in:
            Users system checks
            Users signal registration
        """
        pass
