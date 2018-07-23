import test from "ava";
import micro from "micro";
import listen from "test-listen";
import request from "request-promise";

test("foo", t => {
  t.pass();
});

test("bar", async t => {
  const bar = Promise.resolve("bar");

  t.is(await bar, "bar");
});

test("my endpoint", async t => {
  const service = micro(async (req, res) => {
    micro.send(res, 200, {
      test: "woot"
    });
  });

  const url = await listen(service);
  const body = await request(url);

  t.deepEqual(JSON.parse(body).test, "woot");
  service.close();
});
