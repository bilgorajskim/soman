from django.apps import AppConfig


class NotesConfig(AppConfig):
    name = 'soman.panel'
    verbose_name = "Notes"

    def ready(self):
        """Override this to put in:
            Users system checks
            Users signal registration
        """
        pass
