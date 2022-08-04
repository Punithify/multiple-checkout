import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_KEY);

const script = `
local tokens_key = KEYS[1]
local timestamp_key = KEYS[2]
local rate = tonumber(ARGV[1])
local capacity = tonumber(ARGV[2])
local now = tonumber(ARGV[3])
local requested = tonumber(ARGV[4])
local fill_time = capacity/rate
local ttl = math.floor(fill_time*2)
local last_tokens = tonumber(redis.call("get", tokens_key))
if last_tokens == nil then
  last_tokens = capacity
end
local last_refreshed = tonumber(redis.call("get", timestamp_key))
if last_refreshed == nil then
  last_refreshed = 0
end
local delta = math.max(0, now-last_refreshed)
local filled_tokens = math.min(capacity, last_tokens+(delta*rate))
local allowed = filled_tokens >= requested
local new_tokens = filled_tokens
if allowed then
  new_tokens = filled_tokens - requested
end
redis.call("setex", tokens_key, ttl, new_tokens)
redis.call("setex", timestamp_key, ttl, now)
return { allowed, new_tokens }
`;

export const check = async (key) => {
  const keys = [`${key}.tokens`, `${key}.timestamp`];
  const rate = 2;
  const capacity = rate * 1;
  const now = Math.floor(new Date().getTime() / 1000);
  const requested = 1;
  const args = [rate, capacity, now, requested];

  const res = await redis.eval(script, keys.length, ...keys, ...args);
  console.log(res);
  return {
    allowed: res[0] === 1,
    remaining: res[1],
  };
};
