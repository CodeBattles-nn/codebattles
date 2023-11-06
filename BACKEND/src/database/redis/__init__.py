import redis

redis_pool = None


def redis_pool_init():
    global redis_pool

    redis_pool = redis.ConnectionPool(
        port=6379,
        decode_responses=True,
        socket_timeout=100,
    )
