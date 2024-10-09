import base64
import random
from dataclasses import dataclass

from captcha.image import ImageCaptcha

from utils import salt_crypt

numbers_string = "1234567890"


@dataclass
class CaptchaOutput:
    base64image: str
    string: str


@dataclass
class CaptchaValidatedOutput(CaptchaOutput):
    sha256_hash: str


def generate(numbers: int = 6) -> CaptchaOutput:
    image = ImageCaptcha()

    string_ref = "".join(random.choice(numbers_string) for _ in range(numbers))
    data = image.generate(string_ref)
    encoded_bytes = base64.b64encode(data.getvalue())
    encoded_string = encoded_bytes.decode("utf-8")

    return CaptchaOutput(base64image=encoded_string, string=string_ref)


def generate_with_validation(numbers: int = 6) -> CaptchaValidatedOutput:
    generated = generate(numbers)

    sha_hash = salt_crypt(generated.string + generated.base64image)

    return CaptchaValidatedOutput(
        base64image=generated.base64image, string=generated.string, sha256_hash=sha_hash
    )


def validate(base64image, string_, original_hash) -> bool:
    user_data_hash = salt_crypt(string_ + base64image)
    print(user_data_hash, original_hash)
    return user_data_hash == original_hash
