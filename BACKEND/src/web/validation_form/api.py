from wtforms import Form, StringField, IntegerField
from wtforms.validators import DataRequired, Regexp

from utils import LETTER_REGEX


class LoginForm(Form):
    id = IntegerField("id", validators=[DataRequired()])
    login = StringField("login", validators=[DataRequired()])
    password = StringField("password", validators=[DataRequired()])


class SendProgramForm(Form):
    cars = StringField("cars", validators=[DataRequired()])
    src = StringField("src", validators=[DataRequired()])
    problem = StringField("problem", validators=[DataRequired(), Regexp(LETTER_REGEX)])
