from django.apps import AppConfig


class SensorsConfig(AppConfig):
    name = 'soman.sensors'
    verbose_name = "Sensors"

    def ready(self):
        """Override this to put in:
            Users system checks
            Users signal registration
        """
        pass
