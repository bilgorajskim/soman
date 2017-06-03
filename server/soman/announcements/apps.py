from django.apps import AppConfig


class AnnouncementsConfig(AppConfig):
    name = 'soman.announcements'
    verbose_name = "Announcements"

    def ready(self):
        """Override this to put in:
            Users system checks
            Users signal registration
        """
        pass
