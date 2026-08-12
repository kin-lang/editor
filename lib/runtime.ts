import {
  Environment,
  MK_NULL,
  MK_STRING,
  MK_NUMBER,
  MK_BOOL,
  MK_OBJECT,
  MK_NATIVE_FN,
  RuntimeVal,
  StringVal,
  NumberVal,
  BooleanVal,
  ObjectVal,
  FunctionValue,
} from "@kin-lang/kin";

type ArrayVal = RuntimeVal & { type: "array"; elements: RuntimeVal[] };

function MK_ARRAY(elements: RuntimeVal[] = []): ArrayVal {
  return { type: "array", elements } as ArrayVal;
}

export function matchType(arg: RuntimeVal): any {
  switch (arg.type) {
    case "string":
      return (arg as StringVal).value;
    case "number":
      return (arg as NumberVal).value;
    case "boolean":
      return (arg as BooleanVal).value ? "nibyo" : "sibyo";
    case "null":
      return "ubusa";
    case "array": {
      const arr = arg as ArrayVal;
      return arr.elements.map((el) => matchType(el));
    }
    case "object": {
      const obj: { [key: string]: unknown } = {};
      const aObj = arg as ObjectVal;
      aObj.properties.forEach((value, key) => {
        obj[key] = matchType(value);
      });
      return obj;
    }
    case "fn": {
      const fn = arg as FunctionValue;
      return {
        name: fn.name,
        body: fn.body,
        internal: false,
      };
    }
    default:
      return arg;
  }
}

function asArray(val: RuntimeVal): ArrayVal {
  if (val.type === "array") return val as ArrayVal;
  // Compatibility if an older Kin package still models arrays as objects.
  if (val.type === "object") {
    const obj = val as ObjectVal;
    const elements: RuntimeVal[] = [];
    for (let i = 0; i < obj.properties.size; i++) {
      const el = obj.properties.get(String(i));
      if (el) elements.push(el);
    }
    return MK_ARRAY(elements);
  }
  throw new Error("KIN_URUTONDE expects an array");
}

export function createWebEnv(
  inputQueue: string[],
  outputList: string[]
): Environment {
  const env = new Environment();

  env.declareVar("nibyo", MK_BOOL(true), true);
  env.declareVar("sibyo", MK_BOOL(false), true);
  env.declareVar("ubusa", MK_NULL(), true);
  env.declareVar("ikosa", MK_NULL(), false);

  env.declareVar(
    "tangaza_amakuru",
    MK_NATIVE_FN((args) => {
      const output = args
        .map((arg) => {
          const val = matchType(arg);
          return typeof val === "object" ? JSON.stringify(val) : String(val);
        })
        .join(" ");
      outputList.push(output);
      return MK_NULL();
    }),
    true
  );

  env.declareVar(
    "injiza_amakuru",
    MK_NATIVE_FN((args) => {
      const nextInput = inputQueue.shift();
      if (nextInput !== undefined) {
        const numberRegex = /^-?\d+(\.\d*)?$/;
        if (numberRegex.test(nextInput)) return MK_NUMBER(Number(nextInput));
        return MK_STRING(nextInput);
      }
      return MK_NULL();
    }),
    true
  );

  const securityError = () => {
    throw new Error(
      "Security Error: This operation is disabled in the online editor."
    );
  };
  env.declareVar("sisitemu", MK_NATIVE_FN(securityError), true);
  env.declareVar("KIN_INYANDIKO", MK_OBJECT(new Map()), true);

  env.declareVar(
    "KIN_IMIBARE",
    MK_OBJECT(
      new Map()
        .set("pi", MK_NUMBER(Math.PI))
        .set(
          "umuzikare",
          MK_NATIVE_FN((args) => {
            const arg = (args[0] as NumberVal).value;
            return MK_NUMBER(Math.sqrt(arg));
          })
        )
        .set(
          "umubare_utazwi",
          MK_NATIVE_FN((args) => {
            const min = Math.ceil((args[0] as NumberVal).value);
            const max = Math.floor((args[1] as NumberVal).value);
            return MK_NUMBER(Math.floor(Math.random() * (max - min + 1)) + min);
          })
        )
        .set(
          "kuraho_ibice",
          MK_NATIVE_FN((args) =>
            MK_NUMBER(Math.round((args[0] as NumberVal).value))
          )
        )
        .set(
          "sin",
          MK_NATIVE_FN((args) =>
            MK_NUMBER(Math.sin((args[0] as NumberVal).value))
          )
        )
        .set(
          "cos",
          MK_NATIVE_FN((args) =>
            MK_NUMBER(Math.cos((args[0] as NumberVal).value))
          )
        )
        .set(
          "tan",
          MK_NATIVE_FN((args) =>
            MK_NUMBER(Math.tan((args[0] as NumberVal).value))
          )
        )
    ),
    true
  );

  env.declareVar(
    "KIN_AMAGAMBO",
    MK_OBJECT(
      new Map()
        .set(
          "huza",
          MK_NATIVE_FN((args) => {
            let res = "";
            args.forEach((arg) => (res += (arg as StringVal).value));
            return MK_STRING(res);
          })
        )
        .set(
          "ingano",
          MK_NATIVE_FN((args) => MK_NUMBER((args[0] as StringVal).value.length))
        )
        .set(
          "inyuguti",
          MK_NATIVE_FN((args) =>
            MK_STRING(
              (args[0] as StringVal).value.charAt((args[1] as NumberVal).value)
            )
          )
        )
        .set(
          "inyuguti_nkuru",
          MK_NATIVE_FN((args) =>
            MK_STRING((args[0] as StringVal).value.toUpperCase())
          )
        )
        .set(
          "inyuguti_ntoya",
          MK_NATIVE_FN((args) =>
            MK_STRING((args[0] as StringVal).value.toLowerCase())
          )
        )
        .set(
          "tandukanya",
          MK_NATIVE_FN((args) => {
            const str = (args[0] as StringVal).value;
            const sep = (args[1] as StringVal).value;
            return MK_ARRAY(str.split(sep).map((s) => MK_STRING(s)));
          })
        )
    ),
    true
  );

  env.declareVar(
    "KIN_URUTONDE",
    MK_OBJECT(
      new Map()
        .set(
          "ingano",
          MK_NATIVE_FN((args) => MK_NUMBER(asArray(args[0]).elements.length))
        )
        .set(
          "ongera_kumusozo",
          MK_NATIVE_FN((args) => {
            const arr = asArray(args[0]);
            arr.elements.push(args[1]);
            return MK_NUMBER(arr.elements.length);
          })
        )
        .set(
          "ifite",
          MK_NATIVE_FN((args) => {
            const arr = asArray(args[0]);
            const target = args[1];
            for (const val of arr.elements) {
              if (
                "value" in val &&
                "value" in target &&
                (val as { value: unknown }).value ===
                  (target as { value: unknown }).value
              ) {
                return MK_BOOL(true);
              }
            }
            return MK_BOOL(false);
          })
        )
    ),
    true
  );

  env.declareVar(
    "ubwoko",
    MK_NATIVE_FN((args) => {
      const t = args[0]?.type ?? "null";
      return MK_STRING(t === "array" ? "urutonde" : t);
    }),
    true
  );

  return env;
}
