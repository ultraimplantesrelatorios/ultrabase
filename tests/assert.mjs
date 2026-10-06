export function eq(actual,expected,msg){if(actual!==expected)throw new Error(`${msg||'assert'} | expected=${expected} actual=${actual}`)}
export function ok(value,msg){if(!value)throw new Error(msg||'assertion failed')}
