import redis
from redis import RedisError


class RedisWrapper:

    def __init__(self, pool, **kwargs):
        self.__redis_inited = True
        self.__r = redis.Redis(connection_pool=pool, **kwargs)

        self.get = self.wrapper(self.__r.get)
        self.set = self.wrapper(self.__r.set)
        self.delete = self.wrapper(self.__r.delete)

    def wrapper(self, func):
        def inner(*args, **kwargs):
            if not self.__redis_inited:
                return None

            try:
                result = func(*args, **kwargs)
                return result
            except RedisError as e:
                print(e)
                self.__redis_inited = False
                return None

        return inner
