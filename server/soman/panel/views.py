from django.views.generic import TemplateView
import json
from django.forms.models import model_to_dict

class NotesView(TemplateView):

    template_name = "panel.html"

    def get_context_data(self, **kwargs):
        context = super(TemplateView, self).get_context_data(**kwargs)
        context['user'] = self.request.user.is_authenticated
        return context
