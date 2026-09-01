
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Shipment
 * 
 */
export type Shipment = $Result.DefaultSelection<Prisma.$ShipmentPayload>
/**
 * Model Document
 * 
 */
export type Document = $Result.DefaultSelection<Prisma.$DocumentPayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model ResetToken
 * 
 */
export type ResetToken = $Result.DefaultSelection<Prisma.$ResetTokenPayload>
/**
 * Model ActivityLog
 * 
 */
export type ActivityLog = $Result.DefaultSelection<Prisma.$ActivityLogPayload>
/**
 * Model WellShipment
 * 
 */
export type WellShipment = $Result.DefaultSelection<Prisma.$WellShipmentPayload>
/**
 * Model WellEvent
 * 
 */
export type WellEvent = $Result.DefaultSelection<Prisma.$WellEventPayload>
/**
 * Model WellException
 * 
 */
export type WellException = $Result.DefaultSelection<Prisma.$WellExceptionPayload>
/**
 * Model WellContainer
 * 
 */
export type WellContainer = $Result.DefaultSelection<Prisma.$WellContainerPayload>
/**
 * Model WellDocument
 * 
 */
export type WellDocument = $Result.DefaultSelection<Prisma.$WellDocumentPayload>
/**
 * Model WellRefCounter
 * 
 */
export type WellRefCounter = $Result.DefaultSelection<Prisma.$WellRefCounterPayload>
/**
 * Model WellShipmentNote
 * 
 */
export type WellShipmentNote = $Result.DefaultSelection<Prisma.$WellShipmentNotePayload>

/**
 * Enums
 */
export namespace $Enums {
  export const ShipmentStatus: {
  NEW: 'NEW',
  FERI_ADDED: 'FERI_ADDED',
  PAID: 'PAID',
  AD_GENERATED: 'AD_GENERATED',
  COMPLETED: 'COMPLETED'
};

export type ShipmentStatus = (typeof ShipmentStatus)[keyof typeof ShipmentStatus]


export const DocumentType: {
  BL: 'BL',
  PACKING_LIST: 'PACKING_LIST',
  COMMERCIAL_INVOICE: 'COMMERCIAL_INVOICE',
  DRAFT_FERI: 'DRAFT_FERI',
  PROFORMA: 'PROFORMA',
  POP: 'POP',
  AD: 'AD',
  FACTURE: 'FACTURE',
  FINAL_FERI: 'FINAL_FERI',
  TIO: 'TIO'
};

export type DocumentType = (typeof DocumentType)[keyof typeof DocumentType]


export const WellShipmentStatus: {
  AVA: 'AVA',
  FUP: 'FUP',
  FURO: 'FURO',
  PCHARGES: 'PCHARGES'
};

export type WellShipmentStatus = (typeof WellShipmentStatus)[keyof typeof WellShipmentStatus]

}

export type ShipmentStatus = $Enums.ShipmentStatus

export const ShipmentStatus: typeof $Enums.ShipmentStatus

export type DocumentType = $Enums.DocumentType

export const DocumentType: typeof $Enums.DocumentType

export type WellShipmentStatus = $Enums.WellShipmentStatus

export const WellShipmentStatus: typeof $Enums.WellShipmentStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Shipments
 * const shipments = await prisma.shipment.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Shipments
   * const shipments = await prisma.shipment.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.shipment`: Exposes CRUD operations for the **Shipment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Shipments
    * const shipments = await prisma.shipment.findMany()
    * ```
    */
  get shipment(): Prisma.ShipmentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.document`: Exposes CRUD operations for the **Document** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Documents
    * const documents = await prisma.document.findMany()
    * ```
    */
  get document(): Prisma.DocumentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.resetToken`: Exposes CRUD operations for the **ResetToken** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ResetTokens
    * const resetTokens = await prisma.resetToken.findMany()
    * ```
    */
  get resetToken(): Prisma.ResetTokenDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.activityLog`: Exposes CRUD operations for the **ActivityLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ActivityLogs
    * const activityLogs = await prisma.activityLog.findMany()
    * ```
    */
  get activityLog(): Prisma.ActivityLogDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.wellShipment`: Exposes CRUD operations for the **WellShipment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WellShipments
    * const wellShipments = await prisma.wellShipment.findMany()
    * ```
    */
  get wellShipment(): Prisma.WellShipmentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.wellEvent`: Exposes CRUD operations for the **WellEvent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WellEvents
    * const wellEvents = await prisma.wellEvent.findMany()
    * ```
    */
  get wellEvent(): Prisma.WellEventDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.wellException`: Exposes CRUD operations for the **WellException** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WellExceptions
    * const wellExceptions = await prisma.wellException.findMany()
    * ```
    */
  get wellException(): Prisma.WellExceptionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.wellContainer`: Exposes CRUD operations for the **WellContainer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WellContainers
    * const wellContainers = await prisma.wellContainer.findMany()
    * ```
    */
  get wellContainer(): Prisma.WellContainerDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.wellDocument`: Exposes CRUD operations for the **WellDocument** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WellDocuments
    * const wellDocuments = await prisma.wellDocument.findMany()
    * ```
    */
  get wellDocument(): Prisma.WellDocumentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.wellRefCounter`: Exposes CRUD operations for the **WellRefCounter** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WellRefCounters
    * const wellRefCounters = await prisma.wellRefCounter.findMany()
    * ```
    */
  get wellRefCounter(): Prisma.WellRefCounterDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.wellShipmentNote`: Exposes CRUD operations for the **WellShipmentNote** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WellShipmentNotes
    * const wellShipmentNotes = await prisma.wellShipmentNote.findMany()
    * ```
    */
  get wellShipmentNote(): Prisma.WellShipmentNoteDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.3
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Shipment: 'Shipment',
    Document: 'Document',
    User: 'User',
    ResetToken: 'ResetToken',
    ActivityLog: 'ActivityLog',
    WellShipment: 'WellShipment',
    WellEvent: 'WellEvent',
    WellException: 'WellException',
    WellContainer: 'WellContainer',
    WellDocument: 'WellDocument',
    WellRefCounter: 'WellRefCounter',
    WellShipmentNote: 'WellShipmentNote'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "shipment" | "document" | "user" | "resetToken" | "activityLog" | "wellShipment" | "wellEvent" | "wellException" | "wellContainer" | "wellDocument" | "wellRefCounter" | "wellShipmentNote"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Shipment: {
        payload: Prisma.$ShipmentPayload<ExtArgs>
        fields: Prisma.ShipmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ShipmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShipmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ShipmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShipmentPayload>
          }
          findFirst: {
            args: Prisma.ShipmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShipmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ShipmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShipmentPayload>
          }
          findMany: {
            args: Prisma.ShipmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShipmentPayload>[]
          }
          create: {
            args: Prisma.ShipmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShipmentPayload>
          }
          createMany: {
            args: Prisma.ShipmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ShipmentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShipmentPayload>[]
          }
          delete: {
            args: Prisma.ShipmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShipmentPayload>
          }
          update: {
            args: Prisma.ShipmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShipmentPayload>
          }
          deleteMany: {
            args: Prisma.ShipmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ShipmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ShipmentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShipmentPayload>[]
          }
          upsert: {
            args: Prisma.ShipmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShipmentPayload>
          }
          aggregate: {
            args: Prisma.ShipmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateShipment>
          }
          groupBy: {
            args: Prisma.ShipmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<ShipmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.ShipmentCountArgs<ExtArgs>
            result: $Utils.Optional<ShipmentCountAggregateOutputType> | number
          }
        }
      }
      Document: {
        payload: Prisma.$DocumentPayload<ExtArgs>
        fields: Prisma.DocumentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DocumentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DocumentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          findFirst: {
            args: Prisma.DocumentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DocumentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          findMany: {
            args: Prisma.DocumentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>[]
          }
          create: {
            args: Prisma.DocumentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          createMany: {
            args: Prisma.DocumentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DocumentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>[]
          }
          delete: {
            args: Prisma.DocumentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          update: {
            args: Prisma.DocumentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          deleteMany: {
            args: Prisma.DocumentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DocumentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DocumentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>[]
          }
          upsert: {
            args: Prisma.DocumentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          aggregate: {
            args: Prisma.DocumentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDocument>
          }
          groupBy: {
            args: Prisma.DocumentGroupByArgs<ExtArgs>
            result: $Utils.Optional<DocumentGroupByOutputType>[]
          }
          count: {
            args: Prisma.DocumentCountArgs<ExtArgs>
            result: $Utils.Optional<DocumentCountAggregateOutputType> | number
          }
        }
      }
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      ResetToken: {
        payload: Prisma.$ResetTokenPayload<ExtArgs>
        fields: Prisma.ResetTokenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ResetTokenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResetTokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ResetTokenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResetTokenPayload>
          }
          findFirst: {
            args: Prisma.ResetTokenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResetTokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ResetTokenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResetTokenPayload>
          }
          findMany: {
            args: Prisma.ResetTokenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResetTokenPayload>[]
          }
          create: {
            args: Prisma.ResetTokenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResetTokenPayload>
          }
          createMany: {
            args: Prisma.ResetTokenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ResetTokenCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResetTokenPayload>[]
          }
          delete: {
            args: Prisma.ResetTokenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResetTokenPayload>
          }
          update: {
            args: Prisma.ResetTokenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResetTokenPayload>
          }
          deleteMany: {
            args: Prisma.ResetTokenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ResetTokenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ResetTokenUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResetTokenPayload>[]
          }
          upsert: {
            args: Prisma.ResetTokenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResetTokenPayload>
          }
          aggregate: {
            args: Prisma.ResetTokenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateResetToken>
          }
          groupBy: {
            args: Prisma.ResetTokenGroupByArgs<ExtArgs>
            result: $Utils.Optional<ResetTokenGroupByOutputType>[]
          }
          count: {
            args: Prisma.ResetTokenCountArgs<ExtArgs>
            result: $Utils.Optional<ResetTokenCountAggregateOutputType> | number
          }
        }
      }
      ActivityLog: {
        payload: Prisma.$ActivityLogPayload<ExtArgs>
        fields: Prisma.ActivityLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ActivityLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ActivityLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>
          }
          findFirst: {
            args: Prisma.ActivityLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ActivityLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>
          }
          findMany: {
            args: Prisma.ActivityLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>[]
          }
          create: {
            args: Prisma.ActivityLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>
          }
          createMany: {
            args: Prisma.ActivityLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ActivityLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>[]
          }
          delete: {
            args: Prisma.ActivityLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>
          }
          update: {
            args: Prisma.ActivityLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>
          }
          deleteMany: {
            args: Prisma.ActivityLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ActivityLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ActivityLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>[]
          }
          upsert: {
            args: Prisma.ActivityLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>
          }
          aggregate: {
            args: Prisma.ActivityLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateActivityLog>
          }
          groupBy: {
            args: Prisma.ActivityLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<ActivityLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.ActivityLogCountArgs<ExtArgs>
            result: $Utils.Optional<ActivityLogCountAggregateOutputType> | number
          }
        }
      }
      WellShipment: {
        payload: Prisma.$WellShipmentPayload<ExtArgs>
        fields: Prisma.WellShipmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WellShipmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WellShipmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WellShipmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WellShipmentPayload>
          }
          findFirst: {
            args: Prisma.WellShipmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WellShipmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WellShipmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WellShipmentPayload>
          }
          findMany: {
            args: Prisma.WellShipmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WellShipmentPayload>[]
          }
          create: {
            args: Prisma.WellShipmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WellShipmentPayload>
          }
          createMany: {
            args: Prisma.WellShipmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WellShipmentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WellShipmentPayload>[]
          }
          delete: {
            args: Prisma.WellShipmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WellShipmentPayload>
          }
          update: {
            args: Prisma.WellShipmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WellShipmentPayload>
          }
          deleteMany: {
            args: Prisma.WellShipmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WellShipmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WellShipmentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WellShipmentPayload>[]
          }
          upsert: {
            args: Prisma.WellShipmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WellShipmentPayload>
          }
          aggregate: {
            args: Prisma.WellShipmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWellShipment>
          }
          groupBy: {
            args: Prisma.WellShipmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<WellShipmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.WellShipmentCountArgs<ExtArgs>
            result: $Utils.Optional<WellShipmentCountAggregateOutputType> | number
          }
        }
      }
      WellEvent: {
        payload: Prisma.$WellEventPayload<ExtArgs>
        fields: Prisma.WellEventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WellEventFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WellEventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WellEventFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WellEventPayload>
          }
          findFirst: {
            args: Prisma.WellEventFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WellEventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WellEventFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WellEventPayload>
          }
          findMany: {
            args: Prisma.WellEventFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WellEventPayload>[]
          }
          create: {
            args: Prisma.WellEventCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WellEventPayload>
          }
          createMany: {
            args: Prisma.WellEventCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WellEventCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WellEventPayload>[]
          }
          delete: {
            args: Prisma.WellEventDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WellEventPayload>
          }
          update: {
            args: Prisma.WellEventUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WellEventPayload>
          }
          deleteMany: {
            args: Prisma.WellEventDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WellEventUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WellEventUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WellEventPayload>[]
          }
          upsert: {
            args: Prisma.WellEventUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WellEventPayload>
          }
          aggregate: {
            args: Prisma.WellEventAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWellEvent>
          }
          groupBy: {
            args: Prisma.WellEventGroupByArgs<ExtArgs>
            result: $Utils.Optional<WellEventGroupByOutputType>[]
          }
          count: {
            args: Prisma.WellEventCountArgs<ExtArgs>
            result: $Utils.Optional<WellEventCountAggregateOutputType> | number
          }
        }
      }
      WellException: {
        payload: Prisma.$WellExceptionPayload<ExtArgs>
        fields: Prisma.WellExceptionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WellExceptionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WellExceptionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WellExceptionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WellExceptionPayload>
          }
          findFirst: {
            args: Prisma.WellExceptionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WellExceptionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WellExceptionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WellExceptionPayload>
          }
          findMany: {
            args: Prisma.WellExceptionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WellExceptionPayload>[]
          }
          create: {
            args: Prisma.WellExceptionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WellExceptionPayload>
          }
          createMany: {
            args: Prisma.WellExceptionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WellExceptionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WellExceptionPayload>[]
          }
          delete: {
            args: Prisma.WellExceptionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WellExceptionPayload>
          }
          update: {
            args: Prisma.WellExceptionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WellExceptionPayload>
          }
          deleteMany: {
            args: Prisma.WellExceptionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WellExceptionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WellExceptionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WellExceptionPayload>[]
          }
          upsert: {
            args: Prisma.WellExceptionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WellExceptionPayload>
          }
          aggregate: {
            args: Prisma.WellExceptionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWellException>
          }
          groupBy: {
            args: Prisma.WellExceptionGroupByArgs<ExtArgs>
            result: $Utils.Optional<WellExceptionGroupByOutputType>[]
          }
          count: {
            args: Prisma.WellExceptionCountArgs<ExtArgs>
            result: $Utils.Optional<WellExceptionCountAggregateOutputType> | number
          }
        }
      }
      WellContainer: {
        payload: Prisma.$WellContainerPayload<ExtArgs>
        fields: Prisma.WellContainerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WellContainerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WellContainerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WellContainerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WellContainerPayload>
          }
          findFirst: {
            args: Prisma.WellContainerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WellContainerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WellContainerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WellContainerPayload>
          }
          findMany: {
            args: Prisma.WellContainerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WellContainerPayload>[]
          }
          create: {
            args: Prisma.WellContainerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WellContainerPayload>
          }
          createMany: {
            args: Prisma.WellContainerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WellContainerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WellContainerPayload>[]
          }
          delete: {
            args: Prisma.WellContainerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WellContainerPayload>
          }
          update: {
            args: Prisma.WellContainerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WellContainerPayload>
          }
          deleteMany: {
            args: Prisma.WellContainerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WellContainerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WellContainerUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WellContainerPayload>[]
          }
          upsert: {
            args: Prisma.WellContainerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WellContainerPayload>
          }
          aggregate: {
            args: Prisma.WellContainerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWellContainer>
          }
          groupBy: {
            args: Prisma.WellContainerGroupByArgs<ExtArgs>
            result: $Utils.Optional<WellContainerGroupByOutputType>[]
          }
          count: {
            args: Prisma.WellContainerCountArgs<ExtArgs>
            result: $Utils.Optional<WellContainerCountAggregateOutputType> | number
          }
        }
      }
      WellDocument: {
        payload: Prisma.$WellDocumentPayload<ExtArgs>
        fields: Prisma.WellDocumentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WellDocumentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WellDocumentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WellDocumentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WellDocumentPayload>
          }
          findFirst: {
            args: Prisma.WellDocumentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WellDocumentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WellDocumentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WellDocumentPayload>
          }
          findMany: {
            args: Prisma.WellDocumentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WellDocumentPayload>[]
          }
          create: {
            args: Prisma.WellDocumentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WellDocumentPayload>
          }
          createMany: {
            args: Prisma.WellDocumentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WellDocumentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WellDocumentPayload>[]
          }
          delete: {
            args: Prisma.WellDocumentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WellDocumentPayload>
          }
          update: {
            args: Prisma.WellDocumentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WellDocumentPayload>
          }
          deleteMany: {
            args: Prisma.WellDocumentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WellDocumentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WellDocumentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WellDocumentPayload>[]
          }
          upsert: {
            args: Prisma.WellDocumentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WellDocumentPayload>
          }
          aggregate: {
            args: Prisma.WellDocumentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWellDocument>
          }
          groupBy: {
            args: Prisma.WellDocumentGroupByArgs<ExtArgs>
            result: $Utils.Optional<WellDocumentGroupByOutputType>[]
          }
          count: {
            args: Prisma.WellDocumentCountArgs<ExtArgs>
            result: $Utils.Optional<WellDocumentCountAggregateOutputType> | number
          }
        }
      }
      WellRefCounter: {
        payload: Prisma.$WellRefCounterPayload<ExtArgs>
        fields: Prisma.WellRefCounterFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WellRefCounterFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WellRefCounterPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WellRefCounterFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WellRefCounterPayload>
          }
          findFirst: {
            args: Prisma.WellRefCounterFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WellRefCounterPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WellRefCounterFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WellRefCounterPayload>
          }
          findMany: {
            args: Prisma.WellRefCounterFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WellRefCounterPayload>[]
          }
          create: {
            args: Prisma.WellRefCounterCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WellRefCounterPayload>
          }
          createMany: {
            args: Prisma.WellRefCounterCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WellRefCounterCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WellRefCounterPayload>[]
          }
          delete: {
            args: Prisma.WellRefCounterDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WellRefCounterPayload>
          }
          update: {
            args: Prisma.WellRefCounterUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WellRefCounterPayload>
          }
          deleteMany: {
            args: Prisma.WellRefCounterDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WellRefCounterUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WellRefCounterUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WellRefCounterPayload>[]
          }
          upsert: {
            args: Prisma.WellRefCounterUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WellRefCounterPayload>
          }
          aggregate: {
            args: Prisma.WellRefCounterAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWellRefCounter>
          }
          groupBy: {
            args: Prisma.WellRefCounterGroupByArgs<ExtArgs>
            result: $Utils.Optional<WellRefCounterGroupByOutputType>[]
          }
          count: {
            args: Prisma.WellRefCounterCountArgs<ExtArgs>
            result: $Utils.Optional<WellRefCounterCountAggregateOutputType> | number
          }
        }
      }
      WellShipmentNote: {
        payload: Prisma.$WellShipmentNotePayload<ExtArgs>
        fields: Prisma.WellShipmentNoteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WellShipmentNoteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WellShipmentNotePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WellShipmentNoteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WellShipmentNotePayload>
          }
          findFirst: {
            args: Prisma.WellShipmentNoteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WellShipmentNotePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WellShipmentNoteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WellShipmentNotePayload>
          }
          findMany: {
            args: Prisma.WellShipmentNoteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WellShipmentNotePayload>[]
          }
          create: {
            args: Prisma.WellShipmentNoteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WellShipmentNotePayload>
          }
          createMany: {
            args: Prisma.WellShipmentNoteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WellShipmentNoteCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WellShipmentNotePayload>[]
          }
          delete: {
            args: Prisma.WellShipmentNoteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WellShipmentNotePayload>
          }
          update: {
            args: Prisma.WellShipmentNoteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WellShipmentNotePayload>
          }
          deleteMany: {
            args: Prisma.WellShipmentNoteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WellShipmentNoteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WellShipmentNoteUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WellShipmentNotePayload>[]
          }
          upsert: {
            args: Prisma.WellShipmentNoteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WellShipmentNotePayload>
          }
          aggregate: {
            args: Prisma.WellShipmentNoteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWellShipmentNote>
          }
          groupBy: {
            args: Prisma.WellShipmentNoteGroupByArgs<ExtArgs>
            result: $Utils.Optional<WellShipmentNoteGroupByOutputType>[]
          }
          count: {
            args: Prisma.WellShipmentNoteCountArgs<ExtArgs>
            result: $Utils.Optional<WellShipmentNoteCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    shipment?: ShipmentOmit
    document?: DocumentOmit
    user?: UserOmit
    resetToken?: ResetTokenOmit
    activityLog?: ActivityLogOmit
    wellShipment?: WellShipmentOmit
    wellEvent?: WellEventOmit
    wellException?: WellExceptionOmit
    wellContainer?: WellContainerOmit
    wellDocument?: WellDocumentOmit
    wellRefCounter?: WellRefCounterOmit
    wellShipmentNote?: WellShipmentNoteOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type ShipmentCountOutputType
   */

  export type ShipmentCountOutputType = {
    documents: number
  }

  export type ShipmentCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    documents?: boolean | ShipmentCountOutputTypeCountDocumentsArgs
  }

  // Custom InputTypes
  /**
   * ShipmentCountOutputType without action
   */
  export type ShipmentCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShipmentCountOutputType
     */
    select?: ShipmentCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ShipmentCountOutputType without action
   */
  export type ShipmentCountOutputTypeCountDocumentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DocumentWhereInput
  }


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    resetTokens: number
    activityLogs: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    resetTokens?: boolean | UserCountOutputTypeCountResetTokensArgs
    activityLogs?: boolean | UserCountOutputTypeCountActivityLogsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountResetTokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ResetTokenWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountActivityLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActivityLogWhereInput
  }


  /**
   * Count Type WellShipmentCountOutputType
   */

  export type WellShipmentCountOutputType = {
    documents: number
    containers: number
    events: number
    exceptions: number
    notesHistory: number
  }

  export type WellShipmentCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    documents?: boolean | WellShipmentCountOutputTypeCountDocumentsArgs
    containers?: boolean | WellShipmentCountOutputTypeCountContainersArgs
    events?: boolean | WellShipmentCountOutputTypeCountEventsArgs
    exceptions?: boolean | WellShipmentCountOutputTypeCountExceptionsArgs
    notesHistory?: boolean | WellShipmentCountOutputTypeCountNotesHistoryArgs
  }

  // Custom InputTypes
  /**
   * WellShipmentCountOutputType without action
   */
  export type WellShipmentCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WellShipmentCountOutputType
     */
    select?: WellShipmentCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * WellShipmentCountOutputType without action
   */
  export type WellShipmentCountOutputTypeCountDocumentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WellDocumentWhereInput
  }

  /**
   * WellShipmentCountOutputType without action
   */
  export type WellShipmentCountOutputTypeCountContainersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WellContainerWhereInput
  }

  /**
   * WellShipmentCountOutputType without action
   */
  export type WellShipmentCountOutputTypeCountEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WellEventWhereInput
  }

  /**
   * WellShipmentCountOutputType without action
   */
  export type WellShipmentCountOutputTypeCountExceptionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WellExceptionWhereInput
  }

  /**
   * WellShipmentCountOutputType without action
   */
  export type WellShipmentCountOutputTypeCountNotesHistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WellShipmentNoteWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Shipment
   */

  export type AggregateShipment = {
    _count: ShipmentCountAggregateOutputType | null
    _avg: ShipmentAvgAggregateOutputType | null
    _sum: ShipmentSumAggregateOutputType | null
    _min: ShipmentMinAggregateOutputType | null
    _max: ShipmentMaxAggregateOutputType | null
  }

  export type ShipmentAvgAggregateOutputType = {
    containerCount: number | null
    proformaAmountEUR: Decimal | null
    commissionEUR: Decimal | null
    exchangeRate: Decimal | null
    adAmountUSD: Decimal | null
    ferriUSD: Decimal | null
    commUSD: Decimal | null
    totalUSD: Decimal | null
    wellRevenue: Decimal | null
    musungoRevenue: Decimal | null
    ogefremRevenue: Decimal | null
    roeKsh: Decimal | null
  }

  export type ShipmentSumAggregateOutputType = {
    containerCount: number | null
    proformaAmountEUR: Decimal | null
    commissionEUR: Decimal | null
    exchangeRate: Decimal | null
    adAmountUSD: Decimal | null
    ferriUSD: Decimal | null
    commUSD: Decimal | null
    totalUSD: Decimal | null
    wellRevenue: Decimal | null
    musungoRevenue: Decimal | null
    ogefremRevenue: Decimal | null
    roeKsh: Decimal | null
  }

  export type ShipmentMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    clientName: string | null
    blNumber: string | null
    status: $Enums.ShipmentStatus | null
    containerCount: number | null
    isFeriSkipped: boolean | null
    feriNumber: string | null
    proformaNumber: string | null
    proformaAmountEUR: Decimal | null
    commissionEUR: Decimal | null
    exchangeRate: Decimal | null
    adAmountUSD: Decimal | null
    tioNumber: string | null
    ferriUSD: Decimal | null
    commUSD: Decimal | null
    totalUSD: Decimal | null
    wellRevenue: Decimal | null
    musungoRevenue: Decimal | null
    ogefremRevenue: Decimal | null
    invoiceNumber: string | null
    invoiceDate: Date | null
    vesselName: string | null
    entryNumber: string | null
    roeKsh: Decimal | null
    hsCode: string | null
    preparedBy: string | null
    cuInvoiceNumber: string | null
    qrCodeUrl: string | null
    cuDateTime: Date | null
    cuSerialNumber: string | null
    customerPin: string | null
  }

  export type ShipmentMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    clientName: string | null
    blNumber: string | null
    status: $Enums.ShipmentStatus | null
    containerCount: number | null
    isFeriSkipped: boolean | null
    feriNumber: string | null
    proformaNumber: string | null
    proformaAmountEUR: Decimal | null
    commissionEUR: Decimal | null
    exchangeRate: Decimal | null
    adAmountUSD: Decimal | null
    tioNumber: string | null
    ferriUSD: Decimal | null
    commUSD: Decimal | null
    totalUSD: Decimal | null
    wellRevenue: Decimal | null
    musungoRevenue: Decimal | null
    ogefremRevenue: Decimal | null
    invoiceNumber: string | null
    invoiceDate: Date | null
    vesselName: string | null
    entryNumber: string | null
    roeKsh: Decimal | null
    hsCode: string | null
    preparedBy: string | null
    cuInvoiceNumber: string | null
    qrCodeUrl: string | null
    cuDateTime: Date | null
    cuSerialNumber: string | null
    customerPin: string | null
  }

  export type ShipmentCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    clientName: number
    blNumber: number
    status: number
    containerCount: number
    isFeriSkipped: number
    feriNumber: number
    proformaNumber: number
    proformaAmountEUR: number
    commissionEUR: number
    exchangeRate: number
    adAmountUSD: number
    tioNumber: number
    ferriUSD: number
    commUSD: number
    totalUSD: number
    wellRevenue: number
    musungoRevenue: number
    ogefremRevenue: number
    invoiceNumber: number
    invoiceDate: number
    vesselName: number
    entryNumber: number
    roeKsh: number
    hsCode: number
    preparedBy: number
    cuInvoiceNumber: number
    qrCodeUrl: number
    cuDateTime: number
    cuSerialNumber: number
    customerPin: number
    _all: number
  }


  export type ShipmentAvgAggregateInputType = {
    containerCount?: true
    proformaAmountEUR?: true
    commissionEUR?: true
    exchangeRate?: true
    adAmountUSD?: true
    ferriUSD?: true
    commUSD?: true
    totalUSD?: true
    wellRevenue?: true
    musungoRevenue?: true
    ogefremRevenue?: true
    roeKsh?: true
  }

  export type ShipmentSumAggregateInputType = {
    containerCount?: true
    proformaAmountEUR?: true
    commissionEUR?: true
    exchangeRate?: true
    adAmountUSD?: true
    ferriUSD?: true
    commUSD?: true
    totalUSD?: true
    wellRevenue?: true
    musungoRevenue?: true
    ogefremRevenue?: true
    roeKsh?: true
  }

  export type ShipmentMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    clientName?: true
    blNumber?: true
    status?: true
    containerCount?: true
    isFeriSkipped?: true
    feriNumber?: true
    proformaNumber?: true
    proformaAmountEUR?: true
    commissionEUR?: true
    exchangeRate?: true
    adAmountUSD?: true
    tioNumber?: true
    ferriUSD?: true
    commUSD?: true
    totalUSD?: true
    wellRevenue?: true
    musungoRevenue?: true
    ogefremRevenue?: true
    invoiceNumber?: true
    invoiceDate?: true
    vesselName?: true
    entryNumber?: true
    roeKsh?: true
    hsCode?: true
    preparedBy?: true
    cuInvoiceNumber?: true
    qrCodeUrl?: true
    cuDateTime?: true
    cuSerialNumber?: true
    customerPin?: true
  }

  export type ShipmentMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    clientName?: true
    blNumber?: true
    status?: true
    containerCount?: true
    isFeriSkipped?: true
    feriNumber?: true
    proformaNumber?: true
    proformaAmountEUR?: true
    commissionEUR?: true
    exchangeRate?: true
    adAmountUSD?: true
    tioNumber?: true
    ferriUSD?: true
    commUSD?: true
    totalUSD?: true
    wellRevenue?: true
    musungoRevenue?: true
    ogefremRevenue?: true
    invoiceNumber?: true
    invoiceDate?: true
    vesselName?: true
    entryNumber?: true
    roeKsh?: true
    hsCode?: true
    preparedBy?: true
    cuInvoiceNumber?: true
    qrCodeUrl?: true
    cuDateTime?: true
    cuSerialNumber?: true
    customerPin?: true
  }

  export type ShipmentCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    clientName?: true
    blNumber?: true
    status?: true
    containerCount?: true
    isFeriSkipped?: true
    feriNumber?: true
    proformaNumber?: true
    proformaAmountEUR?: true
    commissionEUR?: true
    exchangeRate?: true
    adAmountUSD?: true
    tioNumber?: true
    ferriUSD?: true
    commUSD?: true
    totalUSD?: true
    wellRevenue?: true
    musungoRevenue?: true
    ogefremRevenue?: true
    invoiceNumber?: true
    invoiceDate?: true
    vesselName?: true
    entryNumber?: true
    roeKsh?: true
    hsCode?: true
    preparedBy?: true
    cuInvoiceNumber?: true
    qrCodeUrl?: true
    cuDateTime?: true
    cuSerialNumber?: true
    customerPin?: true
    _all?: true
  }

  export type ShipmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Shipment to aggregate.
     */
    where?: ShipmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Shipments to fetch.
     */
    orderBy?: ShipmentOrderByWithRelationInput | ShipmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ShipmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Shipments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Shipments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Shipments
    **/
    _count?: true | ShipmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ShipmentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ShipmentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ShipmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ShipmentMaxAggregateInputType
  }

  export type GetShipmentAggregateType<T extends ShipmentAggregateArgs> = {
        [P in keyof T & keyof AggregateShipment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateShipment[P]>
      : GetScalarType<T[P], AggregateShipment[P]>
  }




  export type ShipmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ShipmentWhereInput
    orderBy?: ShipmentOrderByWithAggregationInput | ShipmentOrderByWithAggregationInput[]
    by: ShipmentScalarFieldEnum[] | ShipmentScalarFieldEnum
    having?: ShipmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ShipmentCountAggregateInputType | true
    _avg?: ShipmentAvgAggregateInputType
    _sum?: ShipmentSumAggregateInputType
    _min?: ShipmentMinAggregateInputType
    _max?: ShipmentMaxAggregateInputType
  }

  export type ShipmentGroupByOutputType = {
    id: string
    createdAt: Date
    updatedAt: Date
    clientName: string
    blNumber: string
    status: $Enums.ShipmentStatus
    containerCount: number
    isFeriSkipped: boolean
    feriNumber: string | null
    proformaNumber: string | null
    proformaAmountEUR: Decimal | null
    commissionEUR: Decimal | null
    exchangeRate: Decimal | null
    adAmountUSD: Decimal | null
    tioNumber: string | null
    ferriUSD: Decimal | null
    commUSD: Decimal | null
    totalUSD: Decimal | null
    wellRevenue: Decimal | null
    musungoRevenue: Decimal | null
    ogefremRevenue: Decimal | null
    invoiceNumber: string | null
    invoiceDate: Date | null
    vesselName: string | null
    entryNumber: string | null
    roeKsh: Decimal | null
    hsCode: string | null
    preparedBy: string | null
    cuInvoiceNumber: string | null
    qrCodeUrl: string | null
    cuDateTime: Date | null
    cuSerialNumber: string | null
    customerPin: string | null
    _count: ShipmentCountAggregateOutputType | null
    _avg: ShipmentAvgAggregateOutputType | null
    _sum: ShipmentSumAggregateOutputType | null
    _min: ShipmentMinAggregateOutputType | null
    _max: ShipmentMaxAggregateOutputType | null
  }

  type GetShipmentGroupByPayload<T extends ShipmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ShipmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ShipmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ShipmentGroupByOutputType[P]>
            : GetScalarType<T[P], ShipmentGroupByOutputType[P]>
        }
      >
    >


  export type ShipmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    clientName?: boolean
    blNumber?: boolean
    status?: boolean
    containerCount?: boolean
    isFeriSkipped?: boolean
    feriNumber?: boolean
    proformaNumber?: boolean
    proformaAmountEUR?: boolean
    commissionEUR?: boolean
    exchangeRate?: boolean
    adAmountUSD?: boolean
    tioNumber?: boolean
    ferriUSD?: boolean
    commUSD?: boolean
    totalUSD?: boolean
    wellRevenue?: boolean
    musungoRevenue?: boolean
    ogefremRevenue?: boolean
    invoiceNumber?: boolean
    invoiceDate?: boolean
    vesselName?: boolean
    entryNumber?: boolean
    roeKsh?: boolean
    hsCode?: boolean
    preparedBy?: boolean
    cuInvoiceNumber?: boolean
    qrCodeUrl?: boolean
    cuDateTime?: boolean
    cuSerialNumber?: boolean
    customerPin?: boolean
    documents?: boolean | Shipment$documentsArgs<ExtArgs>
    _count?: boolean | ShipmentCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["shipment"]>

  export type ShipmentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    clientName?: boolean
    blNumber?: boolean
    status?: boolean
    containerCount?: boolean
    isFeriSkipped?: boolean
    feriNumber?: boolean
    proformaNumber?: boolean
    proformaAmountEUR?: boolean
    commissionEUR?: boolean
    exchangeRate?: boolean
    adAmountUSD?: boolean
    tioNumber?: boolean
    ferriUSD?: boolean
    commUSD?: boolean
    totalUSD?: boolean
    wellRevenue?: boolean
    musungoRevenue?: boolean
    ogefremRevenue?: boolean
    invoiceNumber?: boolean
    invoiceDate?: boolean
    vesselName?: boolean
    entryNumber?: boolean
    roeKsh?: boolean
    hsCode?: boolean
    preparedBy?: boolean
    cuInvoiceNumber?: boolean
    qrCodeUrl?: boolean
    cuDateTime?: boolean
    cuSerialNumber?: boolean
    customerPin?: boolean
  }, ExtArgs["result"]["shipment"]>

  export type ShipmentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    clientName?: boolean
    blNumber?: boolean
    status?: boolean
    containerCount?: boolean
    isFeriSkipped?: boolean
    feriNumber?: boolean
    proformaNumber?: boolean
    proformaAmountEUR?: boolean
    commissionEUR?: boolean
    exchangeRate?: boolean
    adAmountUSD?: boolean
    tioNumber?: boolean
    ferriUSD?: boolean
    commUSD?: boolean
    totalUSD?: boolean
    wellRevenue?: boolean
    musungoRevenue?: boolean
    ogefremRevenue?: boolean
    invoiceNumber?: boolean
    invoiceDate?: boolean
    vesselName?: boolean
    entryNumber?: boolean
    roeKsh?: boolean
    hsCode?: boolean
    preparedBy?: boolean
    cuInvoiceNumber?: boolean
    qrCodeUrl?: boolean
    cuDateTime?: boolean
    cuSerialNumber?: boolean
    customerPin?: boolean
  }, ExtArgs["result"]["shipment"]>

  export type ShipmentSelectScalar = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    clientName?: boolean
    blNumber?: boolean
    status?: boolean
    containerCount?: boolean
    isFeriSkipped?: boolean
    feriNumber?: boolean
    proformaNumber?: boolean
    proformaAmountEUR?: boolean
    commissionEUR?: boolean
    exchangeRate?: boolean
    adAmountUSD?: boolean
    tioNumber?: boolean
    ferriUSD?: boolean
    commUSD?: boolean
    totalUSD?: boolean
    wellRevenue?: boolean
    musungoRevenue?: boolean
    ogefremRevenue?: boolean
    invoiceNumber?: boolean
    invoiceDate?: boolean
    vesselName?: boolean
    entryNumber?: boolean
    roeKsh?: boolean
    hsCode?: boolean
    preparedBy?: boolean
    cuInvoiceNumber?: boolean
    qrCodeUrl?: boolean
    cuDateTime?: boolean
    cuSerialNumber?: boolean
    customerPin?: boolean
  }

  export type ShipmentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "updatedAt" | "clientName" | "blNumber" | "status" | "containerCount" | "isFeriSkipped" | "feriNumber" | "proformaNumber" | "proformaAmountEUR" | "commissionEUR" | "exchangeRate" | "adAmountUSD" | "tioNumber" | "ferriUSD" | "commUSD" | "totalUSD" | "wellRevenue" | "musungoRevenue" | "ogefremRevenue" | "invoiceNumber" | "invoiceDate" | "vesselName" | "entryNumber" | "roeKsh" | "hsCode" | "preparedBy" | "cuInvoiceNumber" | "qrCodeUrl" | "cuDateTime" | "cuSerialNumber" | "customerPin", ExtArgs["result"]["shipment"]>
  export type ShipmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    documents?: boolean | Shipment$documentsArgs<ExtArgs>
    _count?: boolean | ShipmentCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ShipmentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ShipmentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ShipmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Shipment"
    objects: {
      documents: Prisma.$DocumentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      updatedAt: Date
      clientName: string
      blNumber: string
      status: $Enums.ShipmentStatus
      containerCount: number
      isFeriSkipped: boolean
      feriNumber: string | null
      proformaNumber: string | null
      proformaAmountEUR: Prisma.Decimal | null
      commissionEUR: Prisma.Decimal | null
      exchangeRate: Prisma.Decimal | null
      adAmountUSD: Prisma.Decimal | null
      tioNumber: string | null
      ferriUSD: Prisma.Decimal | null
      commUSD: Prisma.Decimal | null
      totalUSD: Prisma.Decimal | null
      wellRevenue: Prisma.Decimal | null
      musungoRevenue: Prisma.Decimal | null
      ogefremRevenue: Prisma.Decimal | null
      invoiceNumber: string | null
      invoiceDate: Date | null
      vesselName: string | null
      entryNumber: string | null
      roeKsh: Prisma.Decimal | null
      hsCode: string | null
      preparedBy: string | null
      cuInvoiceNumber: string | null
      qrCodeUrl: string | null
      cuDateTime: Date | null
      cuSerialNumber: string | null
      customerPin: string | null
    }, ExtArgs["result"]["shipment"]>
    composites: {}
  }

  type ShipmentGetPayload<S extends boolean | null | undefined | ShipmentDefaultArgs> = $Result.GetResult<Prisma.$ShipmentPayload, S>

  type ShipmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ShipmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ShipmentCountAggregateInputType | true
    }

  export interface ShipmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Shipment'], meta: { name: 'Shipment' } }
    /**
     * Find zero or one Shipment that matches the filter.
     * @param {ShipmentFindUniqueArgs} args - Arguments to find a Shipment
     * @example
     * // Get one Shipment
     * const shipment = await prisma.shipment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ShipmentFindUniqueArgs>(args: SelectSubset<T, ShipmentFindUniqueArgs<ExtArgs>>): Prisma__ShipmentClient<$Result.GetResult<Prisma.$ShipmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Shipment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ShipmentFindUniqueOrThrowArgs} args - Arguments to find a Shipment
     * @example
     * // Get one Shipment
     * const shipment = await prisma.shipment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ShipmentFindUniqueOrThrowArgs>(args: SelectSubset<T, ShipmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ShipmentClient<$Result.GetResult<Prisma.$ShipmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Shipment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShipmentFindFirstArgs} args - Arguments to find a Shipment
     * @example
     * // Get one Shipment
     * const shipment = await prisma.shipment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ShipmentFindFirstArgs>(args?: SelectSubset<T, ShipmentFindFirstArgs<ExtArgs>>): Prisma__ShipmentClient<$Result.GetResult<Prisma.$ShipmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Shipment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShipmentFindFirstOrThrowArgs} args - Arguments to find a Shipment
     * @example
     * // Get one Shipment
     * const shipment = await prisma.shipment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ShipmentFindFirstOrThrowArgs>(args?: SelectSubset<T, ShipmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__ShipmentClient<$Result.GetResult<Prisma.$ShipmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Shipments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShipmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Shipments
     * const shipments = await prisma.shipment.findMany()
     * 
     * // Get first 10 Shipments
     * const shipments = await prisma.shipment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const shipmentWithIdOnly = await prisma.shipment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ShipmentFindManyArgs>(args?: SelectSubset<T, ShipmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ShipmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Shipment.
     * @param {ShipmentCreateArgs} args - Arguments to create a Shipment.
     * @example
     * // Create one Shipment
     * const Shipment = await prisma.shipment.create({
     *   data: {
     *     // ... data to create a Shipment
     *   }
     * })
     * 
     */
    create<T extends ShipmentCreateArgs>(args: SelectSubset<T, ShipmentCreateArgs<ExtArgs>>): Prisma__ShipmentClient<$Result.GetResult<Prisma.$ShipmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Shipments.
     * @param {ShipmentCreateManyArgs} args - Arguments to create many Shipments.
     * @example
     * // Create many Shipments
     * const shipment = await prisma.shipment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ShipmentCreateManyArgs>(args?: SelectSubset<T, ShipmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Shipments and returns the data saved in the database.
     * @param {ShipmentCreateManyAndReturnArgs} args - Arguments to create many Shipments.
     * @example
     * // Create many Shipments
     * const shipment = await prisma.shipment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Shipments and only return the `id`
     * const shipmentWithIdOnly = await prisma.shipment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ShipmentCreateManyAndReturnArgs>(args?: SelectSubset<T, ShipmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ShipmentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Shipment.
     * @param {ShipmentDeleteArgs} args - Arguments to delete one Shipment.
     * @example
     * // Delete one Shipment
     * const Shipment = await prisma.shipment.delete({
     *   where: {
     *     // ... filter to delete one Shipment
     *   }
     * })
     * 
     */
    delete<T extends ShipmentDeleteArgs>(args: SelectSubset<T, ShipmentDeleteArgs<ExtArgs>>): Prisma__ShipmentClient<$Result.GetResult<Prisma.$ShipmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Shipment.
     * @param {ShipmentUpdateArgs} args - Arguments to update one Shipment.
     * @example
     * // Update one Shipment
     * const shipment = await prisma.shipment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ShipmentUpdateArgs>(args: SelectSubset<T, ShipmentUpdateArgs<ExtArgs>>): Prisma__ShipmentClient<$Result.GetResult<Prisma.$ShipmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Shipments.
     * @param {ShipmentDeleteManyArgs} args - Arguments to filter Shipments to delete.
     * @example
     * // Delete a few Shipments
     * const { count } = await prisma.shipment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ShipmentDeleteManyArgs>(args?: SelectSubset<T, ShipmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Shipments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShipmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Shipments
     * const shipment = await prisma.shipment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ShipmentUpdateManyArgs>(args: SelectSubset<T, ShipmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Shipments and returns the data updated in the database.
     * @param {ShipmentUpdateManyAndReturnArgs} args - Arguments to update many Shipments.
     * @example
     * // Update many Shipments
     * const shipment = await prisma.shipment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Shipments and only return the `id`
     * const shipmentWithIdOnly = await prisma.shipment.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ShipmentUpdateManyAndReturnArgs>(args: SelectSubset<T, ShipmentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ShipmentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Shipment.
     * @param {ShipmentUpsertArgs} args - Arguments to update or create a Shipment.
     * @example
     * // Update or create a Shipment
     * const shipment = await prisma.shipment.upsert({
     *   create: {
     *     // ... data to create a Shipment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Shipment we want to update
     *   }
     * })
     */
    upsert<T extends ShipmentUpsertArgs>(args: SelectSubset<T, ShipmentUpsertArgs<ExtArgs>>): Prisma__ShipmentClient<$Result.GetResult<Prisma.$ShipmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Shipments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShipmentCountArgs} args - Arguments to filter Shipments to count.
     * @example
     * // Count the number of Shipments
     * const count = await prisma.shipment.count({
     *   where: {
     *     // ... the filter for the Shipments we want to count
     *   }
     * })
    **/
    count<T extends ShipmentCountArgs>(
      args?: Subset<T, ShipmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ShipmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Shipment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShipmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ShipmentAggregateArgs>(args: Subset<T, ShipmentAggregateArgs>): Prisma.PrismaPromise<GetShipmentAggregateType<T>>

    /**
     * Group by Shipment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShipmentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ShipmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ShipmentGroupByArgs['orderBy'] }
        : { orderBy?: ShipmentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ShipmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetShipmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Shipment model
   */
  readonly fields: ShipmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Shipment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ShipmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    documents<T extends Shipment$documentsArgs<ExtArgs> = {}>(args?: Subset<T, Shipment$documentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Shipment model
   */
  interface ShipmentFieldRefs {
    readonly id: FieldRef<"Shipment", 'String'>
    readonly createdAt: FieldRef<"Shipment", 'DateTime'>
    readonly updatedAt: FieldRef<"Shipment", 'DateTime'>
    readonly clientName: FieldRef<"Shipment", 'String'>
    readonly blNumber: FieldRef<"Shipment", 'String'>
    readonly status: FieldRef<"Shipment", 'ShipmentStatus'>
    readonly containerCount: FieldRef<"Shipment", 'Int'>
    readonly isFeriSkipped: FieldRef<"Shipment", 'Boolean'>
    readonly feriNumber: FieldRef<"Shipment", 'String'>
    readonly proformaNumber: FieldRef<"Shipment", 'String'>
    readonly proformaAmountEUR: FieldRef<"Shipment", 'Decimal'>
    readonly commissionEUR: FieldRef<"Shipment", 'Decimal'>
    readonly exchangeRate: FieldRef<"Shipment", 'Decimal'>
    readonly adAmountUSD: FieldRef<"Shipment", 'Decimal'>
    readonly tioNumber: FieldRef<"Shipment", 'String'>
    readonly ferriUSD: FieldRef<"Shipment", 'Decimal'>
    readonly commUSD: FieldRef<"Shipment", 'Decimal'>
    readonly totalUSD: FieldRef<"Shipment", 'Decimal'>
    readonly wellRevenue: FieldRef<"Shipment", 'Decimal'>
    readonly musungoRevenue: FieldRef<"Shipment", 'Decimal'>
    readonly ogefremRevenue: FieldRef<"Shipment", 'Decimal'>
    readonly invoiceNumber: FieldRef<"Shipment", 'String'>
    readonly invoiceDate: FieldRef<"Shipment", 'DateTime'>
    readonly vesselName: FieldRef<"Shipment", 'String'>
    readonly entryNumber: FieldRef<"Shipment", 'String'>
    readonly roeKsh: FieldRef<"Shipment", 'Decimal'>
    readonly hsCode: FieldRef<"Shipment", 'String'>
    readonly preparedBy: FieldRef<"Shipment", 'String'>
    readonly cuInvoiceNumber: FieldRef<"Shipment", 'String'>
    readonly qrCodeUrl: FieldRef<"Shipment", 'String'>
    readonly cuDateTime: FieldRef<"Shipment", 'DateTime'>
    readonly cuSerialNumber: FieldRef<"Shipment", 'String'>
    readonly customerPin: FieldRef<"Shipment", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Shipment findUnique
   */
  export type ShipmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shipment
     */
    select?: ShipmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Shipment
     */
    omit?: ShipmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShipmentInclude<ExtArgs> | null
    /**
     * Filter, which Shipment to fetch.
     */
    where: ShipmentWhereUniqueInput
  }

  /**
   * Shipment findUniqueOrThrow
   */
  export type ShipmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shipment
     */
    select?: ShipmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Shipment
     */
    omit?: ShipmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShipmentInclude<ExtArgs> | null
    /**
     * Filter, which Shipment to fetch.
     */
    where: ShipmentWhereUniqueInput
  }

  /**
   * Shipment findFirst
   */
  export type ShipmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shipment
     */
    select?: ShipmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Shipment
     */
    omit?: ShipmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShipmentInclude<ExtArgs> | null
    /**
     * Filter, which Shipment to fetch.
     */
    where?: ShipmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Shipments to fetch.
     */
    orderBy?: ShipmentOrderByWithRelationInput | ShipmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Shipments.
     */
    cursor?: ShipmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Shipments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Shipments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Shipments.
     */
    distinct?: ShipmentScalarFieldEnum | ShipmentScalarFieldEnum[]
  }

  /**
   * Shipment findFirstOrThrow
   */
  export type ShipmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shipment
     */
    select?: ShipmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Shipment
     */
    omit?: ShipmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShipmentInclude<ExtArgs> | null
    /**
     * Filter, which Shipment to fetch.
     */
    where?: ShipmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Shipments to fetch.
     */
    orderBy?: ShipmentOrderByWithRelationInput | ShipmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Shipments.
     */
    cursor?: ShipmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Shipments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Shipments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Shipments.
     */
    distinct?: ShipmentScalarFieldEnum | ShipmentScalarFieldEnum[]
  }

  /**
   * Shipment findMany
   */
  export type ShipmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shipment
     */
    select?: ShipmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Shipment
     */
    omit?: ShipmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShipmentInclude<ExtArgs> | null
    /**
     * Filter, which Shipments to fetch.
     */
    where?: ShipmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Shipments to fetch.
     */
    orderBy?: ShipmentOrderByWithRelationInput | ShipmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Shipments.
     */
    cursor?: ShipmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Shipments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Shipments.
     */
    skip?: number
    distinct?: ShipmentScalarFieldEnum | ShipmentScalarFieldEnum[]
  }

  /**
   * Shipment create
   */
  export type ShipmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shipment
     */
    select?: ShipmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Shipment
     */
    omit?: ShipmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShipmentInclude<ExtArgs> | null
    /**
     * The data needed to create a Shipment.
     */
    data: XOR<ShipmentCreateInput, ShipmentUncheckedCreateInput>
  }

  /**
   * Shipment createMany
   */
  export type ShipmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Shipments.
     */
    data: ShipmentCreateManyInput | ShipmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Shipment createManyAndReturn
   */
  export type ShipmentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shipment
     */
    select?: ShipmentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Shipment
     */
    omit?: ShipmentOmit<ExtArgs> | null
    /**
     * The data used to create many Shipments.
     */
    data: ShipmentCreateManyInput | ShipmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Shipment update
   */
  export type ShipmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shipment
     */
    select?: ShipmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Shipment
     */
    omit?: ShipmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShipmentInclude<ExtArgs> | null
    /**
     * The data needed to update a Shipment.
     */
    data: XOR<ShipmentUpdateInput, ShipmentUncheckedUpdateInput>
    /**
     * Choose, which Shipment to update.
     */
    where: ShipmentWhereUniqueInput
  }

  /**
   * Shipment updateMany
   */
  export type ShipmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Shipments.
     */
    data: XOR<ShipmentUpdateManyMutationInput, ShipmentUncheckedUpdateManyInput>
    /**
     * Filter which Shipments to update
     */
    where?: ShipmentWhereInput
    /**
     * Limit how many Shipments to update.
     */
    limit?: number
  }

  /**
   * Shipment updateManyAndReturn
   */
  export type ShipmentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shipment
     */
    select?: ShipmentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Shipment
     */
    omit?: ShipmentOmit<ExtArgs> | null
    /**
     * The data used to update Shipments.
     */
    data: XOR<ShipmentUpdateManyMutationInput, ShipmentUncheckedUpdateManyInput>
    /**
     * Filter which Shipments to update
     */
    where?: ShipmentWhereInput
    /**
     * Limit how many Shipments to update.
     */
    limit?: number
  }

  /**
   * Shipment upsert
   */
  export type ShipmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shipment
     */
    select?: ShipmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Shipment
     */
    omit?: ShipmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShipmentInclude<ExtArgs> | null
    /**
     * The filter to search for the Shipment to update in case it exists.
     */
    where: ShipmentWhereUniqueInput
    /**
     * In case the Shipment found by the `where` argument doesn't exist, create a new Shipment with this data.
     */
    create: XOR<ShipmentCreateInput, ShipmentUncheckedCreateInput>
    /**
     * In case the Shipment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ShipmentUpdateInput, ShipmentUncheckedUpdateInput>
  }

  /**
   * Shipment delete
   */
  export type ShipmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shipment
     */
    select?: ShipmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Shipment
     */
    omit?: ShipmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShipmentInclude<ExtArgs> | null
    /**
     * Filter which Shipment to delete.
     */
    where: ShipmentWhereUniqueInput
  }

  /**
   * Shipment deleteMany
   */
  export type ShipmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Shipments to delete
     */
    where?: ShipmentWhereInput
    /**
     * Limit how many Shipments to delete.
     */
    limit?: number
  }

  /**
   * Shipment.documents
   */
  export type Shipment$documentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    where?: DocumentWhereInput
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    cursor?: DocumentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DocumentScalarFieldEnum | DocumentScalarFieldEnum[]
  }

  /**
   * Shipment without action
   */
  export type ShipmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shipment
     */
    select?: ShipmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Shipment
     */
    omit?: ShipmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShipmentInclude<ExtArgs> | null
  }


  /**
   * Model Document
   */

  export type AggregateDocument = {
    _count: DocumentCountAggregateOutputType | null
    _avg: DocumentAvgAggregateOutputType | null
    _sum: DocumentSumAggregateOutputType | null
    _min: DocumentMinAggregateOutputType | null
    _max: DocumentMaxAggregateOutputType | null
  }

  export type DocumentAvgAggregateOutputType = {
    version: number | null
  }

  export type DocumentSumAggregateOutputType = {
    version: number | null
  }

  export type DocumentMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    shipmentId: string | null
    type: $Enums.DocumentType | null
    filename: string | null
    driveFileId: string | null
    driveUrl: string | null
    version: number | null
    isReplaced: boolean | null
  }

  export type DocumentMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    shipmentId: string | null
    type: $Enums.DocumentType | null
    filename: string | null
    driveFileId: string | null
    driveUrl: string | null
    version: number | null
    isReplaced: boolean | null
  }

  export type DocumentCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    shipmentId: number
    type: number
    filename: number
    driveFileId: number
    driveUrl: number
    version: number
    isReplaced: number
    _all: number
  }


  export type DocumentAvgAggregateInputType = {
    version?: true
  }

  export type DocumentSumAggregateInputType = {
    version?: true
  }

  export type DocumentMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    shipmentId?: true
    type?: true
    filename?: true
    driveFileId?: true
    driveUrl?: true
    version?: true
    isReplaced?: true
  }

  export type DocumentMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    shipmentId?: true
    type?: true
    filename?: true
    driveFileId?: true
    driveUrl?: true
    version?: true
    isReplaced?: true
  }

  export type DocumentCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    shipmentId?: true
    type?: true
    filename?: true
    driveFileId?: true
    driveUrl?: true
    version?: true
    isReplaced?: true
    _all?: true
  }

  export type DocumentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Document to aggregate.
     */
    where?: DocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Documents to fetch.
     */
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Documents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Documents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Documents
    **/
    _count?: true | DocumentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DocumentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DocumentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DocumentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DocumentMaxAggregateInputType
  }

  export type GetDocumentAggregateType<T extends DocumentAggregateArgs> = {
        [P in keyof T & keyof AggregateDocument]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDocument[P]>
      : GetScalarType<T[P], AggregateDocument[P]>
  }




  export type DocumentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DocumentWhereInput
    orderBy?: DocumentOrderByWithAggregationInput | DocumentOrderByWithAggregationInput[]
    by: DocumentScalarFieldEnum[] | DocumentScalarFieldEnum
    having?: DocumentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DocumentCountAggregateInputType | true
    _avg?: DocumentAvgAggregateInputType
    _sum?: DocumentSumAggregateInputType
    _min?: DocumentMinAggregateInputType
    _max?: DocumentMaxAggregateInputType
  }

  export type DocumentGroupByOutputType = {
    id: string
    createdAt: Date
    updatedAt: Date
    shipmentId: string
    type: $Enums.DocumentType
    filename: string
    driveFileId: string
    driveUrl: string
    version: number
    isReplaced: boolean
    _count: DocumentCountAggregateOutputType | null
    _avg: DocumentAvgAggregateOutputType | null
    _sum: DocumentSumAggregateOutputType | null
    _min: DocumentMinAggregateOutputType | null
    _max: DocumentMaxAggregateOutputType | null
  }

  type GetDocumentGroupByPayload<T extends DocumentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DocumentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DocumentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DocumentGroupByOutputType[P]>
            : GetScalarType<T[P], DocumentGroupByOutputType[P]>
        }
      >
    >


  export type DocumentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    shipmentId?: boolean
    type?: boolean
    filename?: boolean
    driveFileId?: boolean
    driveUrl?: boolean
    version?: boolean
    isReplaced?: boolean
    shipment?: boolean | ShipmentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["document"]>

  export type DocumentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    shipmentId?: boolean
    type?: boolean
    filename?: boolean
    driveFileId?: boolean
    driveUrl?: boolean
    version?: boolean
    isReplaced?: boolean
    shipment?: boolean | ShipmentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["document"]>

  export type DocumentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    shipmentId?: boolean
    type?: boolean
    filename?: boolean
    driveFileId?: boolean
    driveUrl?: boolean
    version?: boolean
    isReplaced?: boolean
    shipment?: boolean | ShipmentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["document"]>

  export type DocumentSelectScalar = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    shipmentId?: boolean
    type?: boolean
    filename?: boolean
    driveFileId?: boolean
    driveUrl?: boolean
    version?: boolean
    isReplaced?: boolean
  }

  export type DocumentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "updatedAt" | "shipmentId" | "type" | "filename" | "driveFileId" | "driveUrl" | "version" | "isReplaced", ExtArgs["result"]["document"]>
  export type DocumentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    shipment?: boolean | ShipmentDefaultArgs<ExtArgs>
  }
  export type DocumentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    shipment?: boolean | ShipmentDefaultArgs<ExtArgs>
  }
  export type DocumentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    shipment?: boolean | ShipmentDefaultArgs<ExtArgs>
  }

  export type $DocumentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Document"
    objects: {
      shipment: Prisma.$ShipmentPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      updatedAt: Date
      shipmentId: string
      type: $Enums.DocumentType
      filename: string
      driveFileId: string
      driveUrl: string
      version: number
      isReplaced: boolean
    }, ExtArgs["result"]["document"]>
    composites: {}
  }

  type DocumentGetPayload<S extends boolean | null | undefined | DocumentDefaultArgs> = $Result.GetResult<Prisma.$DocumentPayload, S>

  type DocumentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DocumentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DocumentCountAggregateInputType | true
    }

  export interface DocumentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Document'], meta: { name: 'Document' } }
    /**
     * Find zero or one Document that matches the filter.
     * @param {DocumentFindUniqueArgs} args - Arguments to find a Document
     * @example
     * // Get one Document
     * const document = await prisma.document.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DocumentFindUniqueArgs>(args: SelectSubset<T, DocumentFindUniqueArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Document that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DocumentFindUniqueOrThrowArgs} args - Arguments to find a Document
     * @example
     * // Get one Document
     * const document = await prisma.document.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DocumentFindUniqueOrThrowArgs>(args: SelectSubset<T, DocumentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Document that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentFindFirstArgs} args - Arguments to find a Document
     * @example
     * // Get one Document
     * const document = await prisma.document.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DocumentFindFirstArgs>(args?: SelectSubset<T, DocumentFindFirstArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Document that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentFindFirstOrThrowArgs} args - Arguments to find a Document
     * @example
     * // Get one Document
     * const document = await prisma.document.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DocumentFindFirstOrThrowArgs>(args?: SelectSubset<T, DocumentFindFirstOrThrowArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Documents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Documents
     * const documents = await prisma.document.findMany()
     * 
     * // Get first 10 Documents
     * const documents = await prisma.document.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const documentWithIdOnly = await prisma.document.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DocumentFindManyArgs>(args?: SelectSubset<T, DocumentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Document.
     * @param {DocumentCreateArgs} args - Arguments to create a Document.
     * @example
     * // Create one Document
     * const Document = await prisma.document.create({
     *   data: {
     *     // ... data to create a Document
     *   }
     * })
     * 
     */
    create<T extends DocumentCreateArgs>(args: SelectSubset<T, DocumentCreateArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Documents.
     * @param {DocumentCreateManyArgs} args - Arguments to create many Documents.
     * @example
     * // Create many Documents
     * const document = await prisma.document.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DocumentCreateManyArgs>(args?: SelectSubset<T, DocumentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Documents and returns the data saved in the database.
     * @param {DocumentCreateManyAndReturnArgs} args - Arguments to create many Documents.
     * @example
     * // Create many Documents
     * const document = await prisma.document.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Documents and only return the `id`
     * const documentWithIdOnly = await prisma.document.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DocumentCreateManyAndReturnArgs>(args?: SelectSubset<T, DocumentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Document.
     * @param {DocumentDeleteArgs} args - Arguments to delete one Document.
     * @example
     * // Delete one Document
     * const Document = await prisma.document.delete({
     *   where: {
     *     // ... filter to delete one Document
     *   }
     * })
     * 
     */
    delete<T extends DocumentDeleteArgs>(args: SelectSubset<T, DocumentDeleteArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Document.
     * @param {DocumentUpdateArgs} args - Arguments to update one Document.
     * @example
     * // Update one Document
     * const document = await prisma.document.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DocumentUpdateArgs>(args: SelectSubset<T, DocumentUpdateArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Documents.
     * @param {DocumentDeleteManyArgs} args - Arguments to filter Documents to delete.
     * @example
     * // Delete a few Documents
     * const { count } = await prisma.document.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DocumentDeleteManyArgs>(args?: SelectSubset<T, DocumentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Documents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Documents
     * const document = await prisma.document.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DocumentUpdateManyArgs>(args: SelectSubset<T, DocumentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Documents and returns the data updated in the database.
     * @param {DocumentUpdateManyAndReturnArgs} args - Arguments to update many Documents.
     * @example
     * // Update many Documents
     * const document = await prisma.document.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Documents and only return the `id`
     * const documentWithIdOnly = await prisma.document.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DocumentUpdateManyAndReturnArgs>(args: SelectSubset<T, DocumentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Document.
     * @param {DocumentUpsertArgs} args - Arguments to update or create a Document.
     * @example
     * // Update or create a Document
     * const document = await prisma.document.upsert({
     *   create: {
     *     // ... data to create a Document
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Document we want to update
     *   }
     * })
     */
    upsert<T extends DocumentUpsertArgs>(args: SelectSubset<T, DocumentUpsertArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Documents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentCountArgs} args - Arguments to filter Documents to count.
     * @example
     * // Count the number of Documents
     * const count = await prisma.document.count({
     *   where: {
     *     // ... the filter for the Documents we want to count
     *   }
     * })
    **/
    count<T extends DocumentCountArgs>(
      args?: Subset<T, DocumentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DocumentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Document.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DocumentAggregateArgs>(args: Subset<T, DocumentAggregateArgs>): Prisma.PrismaPromise<GetDocumentAggregateType<T>>

    /**
     * Group by Document.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DocumentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DocumentGroupByArgs['orderBy'] }
        : { orderBy?: DocumentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DocumentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDocumentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Document model
   */
  readonly fields: DocumentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Document.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DocumentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    shipment<T extends ShipmentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ShipmentDefaultArgs<ExtArgs>>): Prisma__ShipmentClient<$Result.GetResult<Prisma.$ShipmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Document model
   */
  interface DocumentFieldRefs {
    readonly id: FieldRef<"Document", 'String'>
    readonly createdAt: FieldRef<"Document", 'DateTime'>
    readonly updatedAt: FieldRef<"Document", 'DateTime'>
    readonly shipmentId: FieldRef<"Document", 'String'>
    readonly type: FieldRef<"Document", 'DocumentType'>
    readonly filename: FieldRef<"Document", 'String'>
    readonly driveFileId: FieldRef<"Document", 'String'>
    readonly driveUrl: FieldRef<"Document", 'String'>
    readonly version: FieldRef<"Document", 'Int'>
    readonly isReplaced: FieldRef<"Document", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Document findUnique
   */
  export type DocumentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter, which Document to fetch.
     */
    where: DocumentWhereUniqueInput
  }

  /**
   * Document findUniqueOrThrow
   */
  export type DocumentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter, which Document to fetch.
     */
    where: DocumentWhereUniqueInput
  }

  /**
   * Document findFirst
   */
  export type DocumentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter, which Document to fetch.
     */
    where?: DocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Documents to fetch.
     */
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Documents.
     */
    cursor?: DocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Documents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Documents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Documents.
     */
    distinct?: DocumentScalarFieldEnum | DocumentScalarFieldEnum[]
  }

  /**
   * Document findFirstOrThrow
   */
  export type DocumentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter, which Document to fetch.
     */
    where?: DocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Documents to fetch.
     */
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Documents.
     */
    cursor?: DocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Documents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Documents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Documents.
     */
    distinct?: DocumentScalarFieldEnum | DocumentScalarFieldEnum[]
  }

  /**
   * Document findMany
   */
  export type DocumentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter, which Documents to fetch.
     */
    where?: DocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Documents to fetch.
     */
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Documents.
     */
    cursor?: DocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Documents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Documents.
     */
    skip?: number
    distinct?: DocumentScalarFieldEnum | DocumentScalarFieldEnum[]
  }

  /**
   * Document create
   */
  export type DocumentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * The data needed to create a Document.
     */
    data: XOR<DocumentCreateInput, DocumentUncheckedCreateInput>
  }

  /**
   * Document createMany
   */
  export type DocumentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Documents.
     */
    data: DocumentCreateManyInput | DocumentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Document createManyAndReturn
   */
  export type DocumentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * The data used to create many Documents.
     */
    data: DocumentCreateManyInput | DocumentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Document update
   */
  export type DocumentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * The data needed to update a Document.
     */
    data: XOR<DocumentUpdateInput, DocumentUncheckedUpdateInput>
    /**
     * Choose, which Document to update.
     */
    where: DocumentWhereUniqueInput
  }

  /**
   * Document updateMany
   */
  export type DocumentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Documents.
     */
    data: XOR<DocumentUpdateManyMutationInput, DocumentUncheckedUpdateManyInput>
    /**
     * Filter which Documents to update
     */
    where?: DocumentWhereInput
    /**
     * Limit how many Documents to update.
     */
    limit?: number
  }

  /**
   * Document updateManyAndReturn
   */
  export type DocumentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * The data used to update Documents.
     */
    data: XOR<DocumentUpdateManyMutationInput, DocumentUncheckedUpdateManyInput>
    /**
     * Filter which Documents to update
     */
    where?: DocumentWhereInput
    /**
     * Limit how many Documents to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Document upsert
   */
  export type DocumentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * The filter to search for the Document to update in case it exists.
     */
    where: DocumentWhereUniqueInput
    /**
     * In case the Document found by the `where` argument doesn't exist, create a new Document with this data.
     */
    create: XOR<DocumentCreateInput, DocumentUncheckedCreateInput>
    /**
     * In case the Document was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DocumentUpdateInput, DocumentUncheckedUpdateInput>
  }

  /**
   * Document delete
   */
  export type DocumentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter which Document to delete.
     */
    where: DocumentWhereUniqueInput
  }

  /**
   * Document deleteMany
   */
  export type DocumentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Documents to delete
     */
    where?: DocumentWhereInput
    /**
     * Limit how many Documents to delete.
     */
    limit?: number
  }

  /**
   * Document without action
   */
  export type DocumentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    username: string | null
    password: string | null
    role: string | null
    department: string | null
    isSuspended: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    username: string | null
    password: string | null
    role: string | null
    department: string | null
    isSuspended: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    username: number
    password: number
    role: number
    department: number
    isSuspended: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    username?: true
    password?: true
    role?: true
    department?: true
    isSuspended?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    username?: true
    password?: true
    role?: true
    department?: true
    isSuspended?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    username?: true
    password?: true
    role?: true
    department?: true
    isSuspended?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    username: string
    password: string
    role: string
    department: string
    isSuspended: boolean
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    username?: boolean
    password?: boolean
    role?: boolean
    department?: boolean
    isSuspended?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    resetTokens?: boolean | User$resetTokensArgs<ExtArgs>
    activityLogs?: boolean | User$activityLogsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    username?: boolean
    password?: boolean
    role?: boolean
    department?: boolean
    isSuspended?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    username?: boolean
    password?: boolean
    role?: boolean
    department?: boolean
    isSuspended?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    username?: boolean
    password?: boolean
    role?: boolean
    department?: boolean
    isSuspended?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "username" | "password" | "role" | "department" | "isSuspended" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    resetTokens?: boolean | User$resetTokensArgs<ExtArgs>
    activityLogs?: boolean | User$activityLogsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      resetTokens: Prisma.$ResetTokenPayload<ExtArgs>[]
      activityLogs: Prisma.$ActivityLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      username: string
      password: string
      role: string
      department: string
      isSuspended: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    resetTokens<T extends User$resetTokensArgs<ExtArgs> = {}>(args?: Subset<T, User$resetTokensArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResetTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    activityLogs<T extends User$activityLogsArgs<ExtArgs> = {}>(args?: Subset<T, User$activityLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly username: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'String'>
    readonly department: FieldRef<"User", 'String'>
    readonly isSuspended: FieldRef<"User", 'Boolean'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.resetTokens
   */
  export type User$resetTokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResetToken
     */
    select?: ResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResetToken
     */
    omit?: ResetTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResetTokenInclude<ExtArgs> | null
    where?: ResetTokenWhereInput
    orderBy?: ResetTokenOrderByWithRelationInput | ResetTokenOrderByWithRelationInput[]
    cursor?: ResetTokenWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ResetTokenScalarFieldEnum | ResetTokenScalarFieldEnum[]
  }

  /**
   * User.activityLogs
   */
  export type User$activityLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogInclude<ExtArgs> | null
    where?: ActivityLogWhereInput
    orderBy?: ActivityLogOrderByWithRelationInput | ActivityLogOrderByWithRelationInput[]
    cursor?: ActivityLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ActivityLogScalarFieldEnum | ActivityLogScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model ResetToken
   */

  export type AggregateResetToken = {
    _count: ResetTokenCountAggregateOutputType | null
    _min: ResetTokenMinAggregateOutputType | null
    _max: ResetTokenMaxAggregateOutputType | null
  }

  export type ResetTokenMinAggregateOutputType = {
    id: string | null
    token: string | null
    expires: Date | null
    createdAt: Date | null
    userId: string | null
  }

  export type ResetTokenMaxAggregateOutputType = {
    id: string | null
    token: string | null
    expires: Date | null
    createdAt: Date | null
    userId: string | null
  }

  export type ResetTokenCountAggregateOutputType = {
    id: number
    token: number
    expires: number
    createdAt: number
    userId: number
    _all: number
  }


  export type ResetTokenMinAggregateInputType = {
    id?: true
    token?: true
    expires?: true
    createdAt?: true
    userId?: true
  }

  export type ResetTokenMaxAggregateInputType = {
    id?: true
    token?: true
    expires?: true
    createdAt?: true
    userId?: true
  }

  export type ResetTokenCountAggregateInputType = {
    id?: true
    token?: true
    expires?: true
    createdAt?: true
    userId?: true
    _all?: true
  }

  export type ResetTokenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ResetToken to aggregate.
     */
    where?: ResetTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ResetTokens to fetch.
     */
    orderBy?: ResetTokenOrderByWithRelationInput | ResetTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ResetTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ResetTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ResetTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ResetTokens
    **/
    _count?: true | ResetTokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ResetTokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ResetTokenMaxAggregateInputType
  }

  export type GetResetTokenAggregateType<T extends ResetTokenAggregateArgs> = {
        [P in keyof T & keyof AggregateResetToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateResetToken[P]>
      : GetScalarType<T[P], AggregateResetToken[P]>
  }




  export type ResetTokenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ResetTokenWhereInput
    orderBy?: ResetTokenOrderByWithAggregationInput | ResetTokenOrderByWithAggregationInput[]
    by: ResetTokenScalarFieldEnum[] | ResetTokenScalarFieldEnum
    having?: ResetTokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ResetTokenCountAggregateInputType | true
    _min?: ResetTokenMinAggregateInputType
    _max?: ResetTokenMaxAggregateInputType
  }

  export type ResetTokenGroupByOutputType = {
    id: string
    token: string
    expires: Date
    createdAt: Date
    userId: string
    _count: ResetTokenCountAggregateOutputType | null
    _min: ResetTokenMinAggregateOutputType | null
    _max: ResetTokenMaxAggregateOutputType | null
  }

  type GetResetTokenGroupByPayload<T extends ResetTokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ResetTokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ResetTokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ResetTokenGroupByOutputType[P]>
            : GetScalarType<T[P], ResetTokenGroupByOutputType[P]>
        }
      >
    >


  export type ResetTokenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    token?: boolean
    expires?: boolean
    createdAt?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["resetToken"]>

  export type ResetTokenSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    token?: boolean
    expires?: boolean
    createdAt?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["resetToken"]>

  export type ResetTokenSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    token?: boolean
    expires?: boolean
    createdAt?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["resetToken"]>

  export type ResetTokenSelectScalar = {
    id?: boolean
    token?: boolean
    expires?: boolean
    createdAt?: boolean
    userId?: boolean
  }

  export type ResetTokenOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "token" | "expires" | "createdAt" | "userId", ExtArgs["result"]["resetToken"]>
  export type ResetTokenInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ResetTokenIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ResetTokenIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ResetTokenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ResetToken"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      token: string
      expires: Date
      createdAt: Date
      userId: string
    }, ExtArgs["result"]["resetToken"]>
    composites: {}
  }

  type ResetTokenGetPayload<S extends boolean | null | undefined | ResetTokenDefaultArgs> = $Result.GetResult<Prisma.$ResetTokenPayload, S>

  type ResetTokenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ResetTokenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ResetTokenCountAggregateInputType | true
    }

  export interface ResetTokenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ResetToken'], meta: { name: 'ResetToken' } }
    /**
     * Find zero or one ResetToken that matches the filter.
     * @param {ResetTokenFindUniqueArgs} args - Arguments to find a ResetToken
     * @example
     * // Get one ResetToken
     * const resetToken = await prisma.resetToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ResetTokenFindUniqueArgs>(args: SelectSubset<T, ResetTokenFindUniqueArgs<ExtArgs>>): Prisma__ResetTokenClient<$Result.GetResult<Prisma.$ResetTokenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ResetToken that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ResetTokenFindUniqueOrThrowArgs} args - Arguments to find a ResetToken
     * @example
     * // Get one ResetToken
     * const resetToken = await prisma.resetToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ResetTokenFindUniqueOrThrowArgs>(args: SelectSubset<T, ResetTokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ResetTokenClient<$Result.GetResult<Prisma.$ResetTokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ResetToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResetTokenFindFirstArgs} args - Arguments to find a ResetToken
     * @example
     * // Get one ResetToken
     * const resetToken = await prisma.resetToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ResetTokenFindFirstArgs>(args?: SelectSubset<T, ResetTokenFindFirstArgs<ExtArgs>>): Prisma__ResetTokenClient<$Result.GetResult<Prisma.$ResetTokenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ResetToken that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResetTokenFindFirstOrThrowArgs} args - Arguments to find a ResetToken
     * @example
     * // Get one ResetToken
     * const resetToken = await prisma.resetToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ResetTokenFindFirstOrThrowArgs>(args?: SelectSubset<T, ResetTokenFindFirstOrThrowArgs<ExtArgs>>): Prisma__ResetTokenClient<$Result.GetResult<Prisma.$ResetTokenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ResetTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResetTokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ResetTokens
     * const resetTokens = await prisma.resetToken.findMany()
     * 
     * // Get first 10 ResetTokens
     * const resetTokens = await prisma.resetToken.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const resetTokenWithIdOnly = await prisma.resetToken.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ResetTokenFindManyArgs>(args?: SelectSubset<T, ResetTokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResetTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ResetToken.
     * @param {ResetTokenCreateArgs} args - Arguments to create a ResetToken.
     * @example
     * // Create one ResetToken
     * const ResetToken = await prisma.resetToken.create({
     *   data: {
     *     // ... data to create a ResetToken
     *   }
     * })
     * 
     */
    create<T extends ResetTokenCreateArgs>(args: SelectSubset<T, ResetTokenCreateArgs<ExtArgs>>): Prisma__ResetTokenClient<$Result.GetResult<Prisma.$ResetTokenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ResetTokens.
     * @param {ResetTokenCreateManyArgs} args - Arguments to create many ResetTokens.
     * @example
     * // Create many ResetTokens
     * const resetToken = await prisma.resetToken.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ResetTokenCreateManyArgs>(args?: SelectSubset<T, ResetTokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ResetTokens and returns the data saved in the database.
     * @param {ResetTokenCreateManyAndReturnArgs} args - Arguments to create many ResetTokens.
     * @example
     * // Create many ResetTokens
     * const resetToken = await prisma.resetToken.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ResetTokens and only return the `id`
     * const resetTokenWithIdOnly = await prisma.resetToken.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ResetTokenCreateManyAndReturnArgs>(args?: SelectSubset<T, ResetTokenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResetTokenPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ResetToken.
     * @param {ResetTokenDeleteArgs} args - Arguments to delete one ResetToken.
     * @example
     * // Delete one ResetToken
     * const ResetToken = await prisma.resetToken.delete({
     *   where: {
     *     // ... filter to delete one ResetToken
     *   }
     * })
     * 
     */
    delete<T extends ResetTokenDeleteArgs>(args: SelectSubset<T, ResetTokenDeleteArgs<ExtArgs>>): Prisma__ResetTokenClient<$Result.GetResult<Prisma.$ResetTokenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ResetToken.
     * @param {ResetTokenUpdateArgs} args - Arguments to update one ResetToken.
     * @example
     * // Update one ResetToken
     * const resetToken = await prisma.resetToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ResetTokenUpdateArgs>(args: SelectSubset<T, ResetTokenUpdateArgs<ExtArgs>>): Prisma__ResetTokenClient<$Result.GetResult<Prisma.$ResetTokenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ResetTokens.
     * @param {ResetTokenDeleteManyArgs} args - Arguments to filter ResetTokens to delete.
     * @example
     * // Delete a few ResetTokens
     * const { count } = await prisma.resetToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ResetTokenDeleteManyArgs>(args?: SelectSubset<T, ResetTokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ResetTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResetTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ResetTokens
     * const resetToken = await prisma.resetToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ResetTokenUpdateManyArgs>(args: SelectSubset<T, ResetTokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ResetTokens and returns the data updated in the database.
     * @param {ResetTokenUpdateManyAndReturnArgs} args - Arguments to update many ResetTokens.
     * @example
     * // Update many ResetTokens
     * const resetToken = await prisma.resetToken.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ResetTokens and only return the `id`
     * const resetTokenWithIdOnly = await prisma.resetToken.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ResetTokenUpdateManyAndReturnArgs>(args: SelectSubset<T, ResetTokenUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResetTokenPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ResetToken.
     * @param {ResetTokenUpsertArgs} args - Arguments to update or create a ResetToken.
     * @example
     * // Update or create a ResetToken
     * const resetToken = await prisma.resetToken.upsert({
     *   create: {
     *     // ... data to create a ResetToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ResetToken we want to update
     *   }
     * })
     */
    upsert<T extends ResetTokenUpsertArgs>(args: SelectSubset<T, ResetTokenUpsertArgs<ExtArgs>>): Prisma__ResetTokenClient<$Result.GetResult<Prisma.$ResetTokenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ResetTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResetTokenCountArgs} args - Arguments to filter ResetTokens to count.
     * @example
     * // Count the number of ResetTokens
     * const count = await prisma.resetToken.count({
     *   where: {
     *     // ... the filter for the ResetTokens we want to count
     *   }
     * })
    **/
    count<T extends ResetTokenCountArgs>(
      args?: Subset<T, ResetTokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ResetTokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ResetToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResetTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ResetTokenAggregateArgs>(args: Subset<T, ResetTokenAggregateArgs>): Prisma.PrismaPromise<GetResetTokenAggregateType<T>>

    /**
     * Group by ResetToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResetTokenGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ResetTokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ResetTokenGroupByArgs['orderBy'] }
        : { orderBy?: ResetTokenGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ResetTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetResetTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ResetToken model
   */
  readonly fields: ResetTokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ResetToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ResetTokenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ResetToken model
   */
  interface ResetTokenFieldRefs {
    readonly id: FieldRef<"ResetToken", 'String'>
    readonly token: FieldRef<"ResetToken", 'String'>
    readonly expires: FieldRef<"ResetToken", 'DateTime'>
    readonly createdAt: FieldRef<"ResetToken", 'DateTime'>
    readonly userId: FieldRef<"ResetToken", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ResetToken findUnique
   */
  export type ResetTokenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResetToken
     */
    select?: ResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResetToken
     */
    omit?: ResetTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResetTokenInclude<ExtArgs> | null
    /**
     * Filter, which ResetToken to fetch.
     */
    where: ResetTokenWhereUniqueInput
  }

  /**
   * ResetToken findUniqueOrThrow
   */
  export type ResetTokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResetToken
     */
    select?: ResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResetToken
     */
    omit?: ResetTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResetTokenInclude<ExtArgs> | null
    /**
     * Filter, which ResetToken to fetch.
     */
    where: ResetTokenWhereUniqueInput
  }

  /**
   * ResetToken findFirst
   */
  export type ResetTokenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResetToken
     */
    select?: ResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResetToken
     */
    omit?: ResetTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResetTokenInclude<ExtArgs> | null
    /**
     * Filter, which ResetToken to fetch.
     */
    where?: ResetTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ResetTokens to fetch.
     */
    orderBy?: ResetTokenOrderByWithRelationInput | ResetTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ResetTokens.
     */
    cursor?: ResetTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ResetTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ResetTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ResetTokens.
     */
    distinct?: ResetTokenScalarFieldEnum | ResetTokenScalarFieldEnum[]
  }

  /**
   * ResetToken findFirstOrThrow
   */
  export type ResetTokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResetToken
     */
    select?: ResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResetToken
     */
    omit?: ResetTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResetTokenInclude<ExtArgs> | null
    /**
     * Filter, which ResetToken to fetch.
     */
    where?: ResetTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ResetTokens to fetch.
     */
    orderBy?: ResetTokenOrderByWithRelationInput | ResetTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ResetTokens.
     */
    cursor?: ResetTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ResetTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ResetTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ResetTokens.
     */
    distinct?: ResetTokenScalarFieldEnum | ResetTokenScalarFieldEnum[]
  }

  /**
   * ResetToken findMany
   */
  export type ResetTokenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResetToken
     */
    select?: ResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResetToken
     */
    omit?: ResetTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResetTokenInclude<ExtArgs> | null
    /**
     * Filter, which ResetTokens to fetch.
     */
    where?: ResetTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ResetTokens to fetch.
     */
    orderBy?: ResetTokenOrderByWithRelationInput | ResetTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ResetTokens.
     */
    cursor?: ResetTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ResetTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ResetTokens.
     */
    skip?: number
    distinct?: ResetTokenScalarFieldEnum | ResetTokenScalarFieldEnum[]
  }

  /**
   * ResetToken create
   */
  export type ResetTokenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResetToken
     */
    select?: ResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResetToken
     */
    omit?: ResetTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResetTokenInclude<ExtArgs> | null
    /**
     * The data needed to create a ResetToken.
     */
    data: XOR<ResetTokenCreateInput, ResetTokenUncheckedCreateInput>
  }

  /**
   * ResetToken createMany
   */
  export type ResetTokenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ResetTokens.
     */
    data: ResetTokenCreateManyInput | ResetTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ResetToken createManyAndReturn
   */
  export type ResetTokenCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResetToken
     */
    select?: ResetTokenSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ResetToken
     */
    omit?: ResetTokenOmit<ExtArgs> | null
    /**
     * The data used to create many ResetTokens.
     */
    data: ResetTokenCreateManyInput | ResetTokenCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResetTokenIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ResetToken update
   */
  export type ResetTokenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResetToken
     */
    select?: ResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResetToken
     */
    omit?: ResetTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResetTokenInclude<ExtArgs> | null
    /**
     * The data needed to update a ResetToken.
     */
    data: XOR<ResetTokenUpdateInput, ResetTokenUncheckedUpdateInput>
    /**
     * Choose, which ResetToken to update.
     */
    where: ResetTokenWhereUniqueInput
  }

  /**
   * ResetToken updateMany
   */
  export type ResetTokenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ResetTokens.
     */
    data: XOR<ResetTokenUpdateManyMutationInput, ResetTokenUncheckedUpdateManyInput>
    /**
     * Filter which ResetTokens to update
     */
    where?: ResetTokenWhereInput
    /**
     * Limit how many ResetTokens to update.
     */
    limit?: number
  }

  /**
   * ResetToken updateManyAndReturn
   */
  export type ResetTokenUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResetToken
     */
    select?: ResetTokenSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ResetToken
     */
    omit?: ResetTokenOmit<ExtArgs> | null
    /**
     * The data used to update ResetTokens.
     */
    data: XOR<ResetTokenUpdateManyMutationInput, ResetTokenUncheckedUpdateManyInput>
    /**
     * Filter which ResetTokens to update
     */
    where?: ResetTokenWhereInput
    /**
     * Limit how many ResetTokens to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResetTokenIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ResetToken upsert
   */
  export type ResetTokenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResetToken
     */
    select?: ResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResetToken
     */
    omit?: ResetTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResetTokenInclude<ExtArgs> | null
    /**
     * The filter to search for the ResetToken to update in case it exists.
     */
    where: ResetTokenWhereUniqueInput
    /**
     * In case the ResetToken found by the `where` argument doesn't exist, create a new ResetToken with this data.
     */
    create: XOR<ResetTokenCreateInput, ResetTokenUncheckedCreateInput>
    /**
     * In case the ResetToken was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ResetTokenUpdateInput, ResetTokenUncheckedUpdateInput>
  }

  /**
   * ResetToken delete
   */
  export type ResetTokenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResetToken
     */
    select?: ResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResetToken
     */
    omit?: ResetTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResetTokenInclude<ExtArgs> | null
    /**
     * Filter which ResetToken to delete.
     */
    where: ResetTokenWhereUniqueInput
  }

  /**
   * ResetToken deleteMany
   */
  export type ResetTokenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ResetTokens to delete
     */
    where?: ResetTokenWhereInput
    /**
     * Limit how many ResetTokens to delete.
     */
    limit?: number
  }

  /**
   * ResetToken without action
   */
  export type ResetTokenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResetToken
     */
    select?: ResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResetToken
     */
    omit?: ResetTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResetTokenInclude<ExtArgs> | null
  }


  /**
   * Model ActivityLog
   */

  export type AggregateActivityLog = {
    _count: ActivityLogCountAggregateOutputType | null
    _min: ActivityLogMinAggregateOutputType | null
    _max: ActivityLogMaxAggregateOutputType | null
  }

  export type ActivityLogMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    userId: string | null
    action: string | null
    entity: string | null
    entityId: string | null
    detail: string | null
  }

  export type ActivityLogMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    userId: string | null
    action: string | null
    entity: string | null
    entityId: string | null
    detail: string | null
  }

  export type ActivityLogCountAggregateOutputType = {
    id: number
    createdAt: number
    userId: number
    action: number
    entity: number
    entityId: number
    detail: number
    _all: number
  }


  export type ActivityLogMinAggregateInputType = {
    id?: true
    createdAt?: true
    userId?: true
    action?: true
    entity?: true
    entityId?: true
    detail?: true
  }

  export type ActivityLogMaxAggregateInputType = {
    id?: true
    createdAt?: true
    userId?: true
    action?: true
    entity?: true
    entityId?: true
    detail?: true
  }

  export type ActivityLogCountAggregateInputType = {
    id?: true
    createdAt?: true
    userId?: true
    action?: true
    entity?: true
    entityId?: true
    detail?: true
    _all?: true
  }

  export type ActivityLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ActivityLog to aggregate.
     */
    where?: ActivityLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActivityLogs to fetch.
     */
    orderBy?: ActivityLogOrderByWithRelationInput | ActivityLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ActivityLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActivityLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActivityLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ActivityLogs
    **/
    _count?: true | ActivityLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ActivityLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ActivityLogMaxAggregateInputType
  }

  export type GetActivityLogAggregateType<T extends ActivityLogAggregateArgs> = {
        [P in keyof T & keyof AggregateActivityLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateActivityLog[P]>
      : GetScalarType<T[P], AggregateActivityLog[P]>
  }




  export type ActivityLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActivityLogWhereInput
    orderBy?: ActivityLogOrderByWithAggregationInput | ActivityLogOrderByWithAggregationInput[]
    by: ActivityLogScalarFieldEnum[] | ActivityLogScalarFieldEnum
    having?: ActivityLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ActivityLogCountAggregateInputType | true
    _min?: ActivityLogMinAggregateInputType
    _max?: ActivityLogMaxAggregateInputType
  }

  export type ActivityLogGroupByOutputType = {
    id: string
    createdAt: Date
    userId: string
    action: string
    entity: string
    entityId: string | null
    detail: string | null
    _count: ActivityLogCountAggregateOutputType | null
    _min: ActivityLogMinAggregateOutputType | null
    _max: ActivityLogMaxAggregateOutputType | null
  }

  type GetActivityLogGroupByPayload<T extends ActivityLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ActivityLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ActivityLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ActivityLogGroupByOutputType[P]>
            : GetScalarType<T[P], ActivityLogGroupByOutputType[P]>
        }
      >
    >


  export type ActivityLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    userId?: boolean
    action?: boolean
    entity?: boolean
    entityId?: boolean
    detail?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["activityLog"]>

  export type ActivityLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    userId?: boolean
    action?: boolean
    entity?: boolean
    entityId?: boolean
    detail?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["activityLog"]>

  export type ActivityLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    userId?: boolean
    action?: boolean
    entity?: boolean
    entityId?: boolean
    detail?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["activityLog"]>

  export type ActivityLogSelectScalar = {
    id?: boolean
    createdAt?: boolean
    userId?: boolean
    action?: boolean
    entity?: boolean
    entityId?: boolean
    detail?: boolean
  }

  export type ActivityLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "userId" | "action" | "entity" | "entityId" | "detail", ExtArgs["result"]["activityLog"]>
  export type ActivityLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ActivityLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ActivityLogIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ActivityLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ActivityLog"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      userId: string
      action: string
      entity: string
      entityId: string | null
      detail: string | null
    }, ExtArgs["result"]["activityLog"]>
    composites: {}
  }

  type ActivityLogGetPayload<S extends boolean | null | undefined | ActivityLogDefaultArgs> = $Result.GetResult<Prisma.$ActivityLogPayload, S>

  type ActivityLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ActivityLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ActivityLogCountAggregateInputType | true
    }

  export interface ActivityLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ActivityLog'], meta: { name: 'ActivityLog' } }
    /**
     * Find zero or one ActivityLog that matches the filter.
     * @param {ActivityLogFindUniqueArgs} args - Arguments to find a ActivityLog
     * @example
     * // Get one ActivityLog
     * const activityLog = await prisma.activityLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ActivityLogFindUniqueArgs>(args: SelectSubset<T, ActivityLogFindUniqueArgs<ExtArgs>>): Prisma__ActivityLogClient<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ActivityLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ActivityLogFindUniqueOrThrowArgs} args - Arguments to find a ActivityLog
     * @example
     * // Get one ActivityLog
     * const activityLog = await prisma.activityLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ActivityLogFindUniqueOrThrowArgs>(args: SelectSubset<T, ActivityLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ActivityLogClient<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ActivityLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityLogFindFirstArgs} args - Arguments to find a ActivityLog
     * @example
     * // Get one ActivityLog
     * const activityLog = await prisma.activityLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ActivityLogFindFirstArgs>(args?: SelectSubset<T, ActivityLogFindFirstArgs<ExtArgs>>): Prisma__ActivityLogClient<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ActivityLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityLogFindFirstOrThrowArgs} args - Arguments to find a ActivityLog
     * @example
     * // Get one ActivityLog
     * const activityLog = await prisma.activityLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ActivityLogFindFirstOrThrowArgs>(args?: SelectSubset<T, ActivityLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__ActivityLogClient<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ActivityLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ActivityLogs
     * const activityLogs = await prisma.activityLog.findMany()
     * 
     * // Get first 10 ActivityLogs
     * const activityLogs = await prisma.activityLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const activityLogWithIdOnly = await prisma.activityLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ActivityLogFindManyArgs>(args?: SelectSubset<T, ActivityLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ActivityLog.
     * @param {ActivityLogCreateArgs} args - Arguments to create a ActivityLog.
     * @example
     * // Create one ActivityLog
     * const ActivityLog = await prisma.activityLog.create({
     *   data: {
     *     // ... data to create a ActivityLog
     *   }
     * })
     * 
     */
    create<T extends ActivityLogCreateArgs>(args: SelectSubset<T, ActivityLogCreateArgs<ExtArgs>>): Prisma__ActivityLogClient<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ActivityLogs.
     * @param {ActivityLogCreateManyArgs} args - Arguments to create many ActivityLogs.
     * @example
     * // Create many ActivityLogs
     * const activityLog = await prisma.activityLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ActivityLogCreateManyArgs>(args?: SelectSubset<T, ActivityLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ActivityLogs and returns the data saved in the database.
     * @param {ActivityLogCreateManyAndReturnArgs} args - Arguments to create many ActivityLogs.
     * @example
     * // Create many ActivityLogs
     * const activityLog = await prisma.activityLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ActivityLogs and only return the `id`
     * const activityLogWithIdOnly = await prisma.activityLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ActivityLogCreateManyAndReturnArgs>(args?: SelectSubset<T, ActivityLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ActivityLog.
     * @param {ActivityLogDeleteArgs} args - Arguments to delete one ActivityLog.
     * @example
     * // Delete one ActivityLog
     * const ActivityLog = await prisma.activityLog.delete({
     *   where: {
     *     // ... filter to delete one ActivityLog
     *   }
     * })
     * 
     */
    delete<T extends ActivityLogDeleteArgs>(args: SelectSubset<T, ActivityLogDeleteArgs<ExtArgs>>): Prisma__ActivityLogClient<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ActivityLog.
     * @param {ActivityLogUpdateArgs} args - Arguments to update one ActivityLog.
     * @example
     * // Update one ActivityLog
     * const activityLog = await prisma.activityLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ActivityLogUpdateArgs>(args: SelectSubset<T, ActivityLogUpdateArgs<ExtArgs>>): Prisma__ActivityLogClient<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ActivityLogs.
     * @param {ActivityLogDeleteManyArgs} args - Arguments to filter ActivityLogs to delete.
     * @example
     * // Delete a few ActivityLogs
     * const { count } = await prisma.activityLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ActivityLogDeleteManyArgs>(args?: SelectSubset<T, ActivityLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ActivityLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ActivityLogs
     * const activityLog = await prisma.activityLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ActivityLogUpdateManyArgs>(args: SelectSubset<T, ActivityLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ActivityLogs and returns the data updated in the database.
     * @param {ActivityLogUpdateManyAndReturnArgs} args - Arguments to update many ActivityLogs.
     * @example
     * // Update many ActivityLogs
     * const activityLog = await prisma.activityLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ActivityLogs and only return the `id`
     * const activityLogWithIdOnly = await prisma.activityLog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ActivityLogUpdateManyAndReturnArgs>(args: SelectSubset<T, ActivityLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ActivityLog.
     * @param {ActivityLogUpsertArgs} args - Arguments to update or create a ActivityLog.
     * @example
     * // Update or create a ActivityLog
     * const activityLog = await prisma.activityLog.upsert({
     *   create: {
     *     // ... data to create a ActivityLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ActivityLog we want to update
     *   }
     * })
     */
    upsert<T extends ActivityLogUpsertArgs>(args: SelectSubset<T, ActivityLogUpsertArgs<ExtArgs>>): Prisma__ActivityLogClient<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ActivityLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityLogCountArgs} args - Arguments to filter ActivityLogs to count.
     * @example
     * // Count the number of ActivityLogs
     * const count = await prisma.activityLog.count({
     *   where: {
     *     // ... the filter for the ActivityLogs we want to count
     *   }
     * })
    **/
    count<T extends ActivityLogCountArgs>(
      args?: Subset<T, ActivityLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ActivityLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ActivityLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ActivityLogAggregateArgs>(args: Subset<T, ActivityLogAggregateArgs>): Prisma.PrismaPromise<GetActivityLogAggregateType<T>>

    /**
     * Group by ActivityLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ActivityLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ActivityLogGroupByArgs['orderBy'] }
        : { orderBy?: ActivityLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ActivityLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetActivityLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ActivityLog model
   */
  readonly fields: ActivityLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ActivityLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ActivityLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ActivityLog model
   */
  interface ActivityLogFieldRefs {
    readonly id: FieldRef<"ActivityLog", 'String'>
    readonly createdAt: FieldRef<"ActivityLog", 'DateTime'>
    readonly userId: FieldRef<"ActivityLog", 'String'>
    readonly action: FieldRef<"ActivityLog", 'String'>
    readonly entity: FieldRef<"ActivityLog", 'String'>
    readonly entityId: FieldRef<"ActivityLog", 'String'>
    readonly detail: FieldRef<"ActivityLog", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ActivityLog findUnique
   */
  export type ActivityLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogInclude<ExtArgs> | null
    /**
     * Filter, which ActivityLog to fetch.
     */
    where: ActivityLogWhereUniqueInput
  }

  /**
   * ActivityLog findUniqueOrThrow
   */
  export type ActivityLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogInclude<ExtArgs> | null
    /**
     * Filter, which ActivityLog to fetch.
     */
    where: ActivityLogWhereUniqueInput
  }

  /**
   * ActivityLog findFirst
   */
  export type ActivityLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogInclude<ExtArgs> | null
    /**
     * Filter, which ActivityLog to fetch.
     */
    where?: ActivityLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActivityLogs to fetch.
     */
    orderBy?: ActivityLogOrderByWithRelationInput | ActivityLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ActivityLogs.
     */
    cursor?: ActivityLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActivityLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActivityLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ActivityLogs.
     */
    distinct?: ActivityLogScalarFieldEnum | ActivityLogScalarFieldEnum[]
  }

  /**
   * ActivityLog findFirstOrThrow
   */
  export type ActivityLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogInclude<ExtArgs> | null
    /**
     * Filter, which ActivityLog to fetch.
     */
    where?: ActivityLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActivityLogs to fetch.
     */
    orderBy?: ActivityLogOrderByWithRelationInput | ActivityLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ActivityLogs.
     */
    cursor?: ActivityLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActivityLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActivityLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ActivityLogs.
     */
    distinct?: ActivityLogScalarFieldEnum | ActivityLogScalarFieldEnum[]
  }

  /**
   * ActivityLog findMany
   */
  export type ActivityLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogInclude<ExtArgs> | null
    /**
     * Filter, which ActivityLogs to fetch.
     */
    where?: ActivityLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActivityLogs to fetch.
     */
    orderBy?: ActivityLogOrderByWithRelationInput | ActivityLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ActivityLogs.
     */
    cursor?: ActivityLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActivityLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActivityLogs.
     */
    skip?: number
    distinct?: ActivityLogScalarFieldEnum | ActivityLogScalarFieldEnum[]
  }

  /**
   * ActivityLog create
   */
  export type ActivityLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogInclude<ExtArgs> | null
    /**
     * The data needed to create a ActivityLog.
     */
    data: XOR<ActivityLogCreateInput, ActivityLogUncheckedCreateInput>
  }

  /**
   * ActivityLog createMany
   */
  export type ActivityLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ActivityLogs.
     */
    data: ActivityLogCreateManyInput | ActivityLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ActivityLog createManyAndReturn
   */
  export type ActivityLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * The data used to create many ActivityLogs.
     */
    data: ActivityLogCreateManyInput | ActivityLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ActivityLog update
   */
  export type ActivityLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogInclude<ExtArgs> | null
    /**
     * The data needed to update a ActivityLog.
     */
    data: XOR<ActivityLogUpdateInput, ActivityLogUncheckedUpdateInput>
    /**
     * Choose, which ActivityLog to update.
     */
    where: ActivityLogWhereUniqueInput
  }

  /**
   * ActivityLog updateMany
   */
  export type ActivityLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ActivityLogs.
     */
    data: XOR<ActivityLogUpdateManyMutationInput, ActivityLogUncheckedUpdateManyInput>
    /**
     * Filter which ActivityLogs to update
     */
    where?: ActivityLogWhereInput
    /**
     * Limit how many ActivityLogs to update.
     */
    limit?: number
  }

  /**
   * ActivityLog updateManyAndReturn
   */
  export type ActivityLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * The data used to update ActivityLogs.
     */
    data: XOR<ActivityLogUpdateManyMutationInput, ActivityLogUncheckedUpdateManyInput>
    /**
     * Filter which ActivityLogs to update
     */
    where?: ActivityLogWhereInput
    /**
     * Limit how many ActivityLogs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ActivityLog upsert
   */
  export type ActivityLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogInclude<ExtArgs> | null
    /**
     * The filter to search for the ActivityLog to update in case it exists.
     */
    where: ActivityLogWhereUniqueInput
    /**
     * In case the ActivityLog found by the `where` argument doesn't exist, create a new ActivityLog with this data.
     */
    create: XOR<ActivityLogCreateInput, ActivityLogUncheckedCreateInput>
    /**
     * In case the ActivityLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ActivityLogUpdateInput, ActivityLogUncheckedUpdateInput>
  }

  /**
   * ActivityLog delete
   */
  export type ActivityLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogInclude<ExtArgs> | null
    /**
     * Filter which ActivityLog to delete.
     */
    where: ActivityLogWhereUniqueInput
  }

  /**
   * ActivityLog deleteMany
   */
  export type ActivityLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ActivityLogs to delete
     */
    where?: ActivityLogWhereInput
    /**
     * Limit how many ActivityLogs to delete.
     */
    limit?: number
  }

  /**
   * ActivityLog without action
   */
  export type ActivityLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogInclude<ExtArgs> | null
  }


  /**
   * Model WellShipment
   */

  export type AggregateWellShipment = {
    _count: WellShipmentCountAggregateOutputType | null
    _avg: WellShipmentAvgAggregateOutputType | null
    _sum: WellShipmentSumAggregateOutputType | null
    _min: WellShipmentMinAggregateOutputType | null
    _max: WellShipmentMaxAggregateOutputType | null
  }

  export type WellShipmentAvgAggregateOutputType = {
    amount: Decimal | null
    roeKsh: Decimal | null
  }

  export type WellShipmentSumAggregateOutputType = {
    amount: Decimal | null
    roeKsh: Decimal | null
  }

  export type WellShipmentMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    refNumber: string | null
    clientName: string | null
    clientRef: string | null
    blNumber: string | null
    containerSize: string | null
    vesselName: string | null
    eta: Date | null
    status: $Enums.WellShipmentStatus | null
    health: string | null
    healthReason: string | null
    currentStage: string | null
    assignedOperator: string | null
    shippingLine: string | null
    origin: string | null
    destination: string | null
    finalDelivery: string | null
    transporter: string | null
    docRecv: string | null
    lodgeCustoms: Date | null
    entryNumber: string | null
    entryPassed: Date | null
    tblNtbl: string | null
    slineCharges: Date | null
    slinePaid: Date | null
    ddRecv: Date | null
    lastSlingCfs: string | null
    lodgedKpa: Date | null
    dateVerified: Date | null
    isPaid: boolean | null
    paidAt: Date | null
    amount: Decimal | null
    roeKsh: Decimal | null
    invoiceDate: Date | null
    notes: string | null
  }

  export type WellShipmentMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    refNumber: string | null
    clientName: string | null
    clientRef: string | null
    blNumber: string | null
    containerSize: string | null
    vesselName: string | null
    eta: Date | null
    status: $Enums.WellShipmentStatus | null
    health: string | null
    healthReason: string | null
    currentStage: string | null
    assignedOperator: string | null
    shippingLine: string | null
    origin: string | null
    destination: string | null
    finalDelivery: string | null
    transporter: string | null
    docRecv: string | null
    lodgeCustoms: Date | null
    entryNumber: string | null
    entryPassed: Date | null
    tblNtbl: string | null
    slineCharges: Date | null
    slinePaid: Date | null
    ddRecv: Date | null
    lastSlingCfs: string | null
    lodgedKpa: Date | null
    dateVerified: Date | null
    isPaid: boolean | null
    paidAt: Date | null
    amount: Decimal | null
    roeKsh: Decimal | null
    invoiceDate: Date | null
    notes: string | null
  }

  export type WellShipmentCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    refNumber: number
    clientName: number
    clientRef: number
    blNumber: number
    containerSize: number
    vesselName: number
    eta: number
    status: number
    health: number
    healthReason: number
    currentStage: number
    assignedOperator: number
    shippingLine: number
    origin: number
    destination: number
    finalDelivery: number
    transporter: number
    docRecv: number
    lodgeCustoms: number
    entryNumber: number
    entryPassed: number
    tblNtbl: number
    slineCharges: number
    slinePaid: number
    ddRecv: number
    lastSlingCfs: number
    lodgedKpa: number
    dateVerified: number
    isPaid: number
    paidAt: number
    amount: number
    roeKsh: number
    invoiceDate: number
    notes: number
    _all: number
  }


  export type WellShipmentAvgAggregateInputType = {
    amount?: true
    roeKsh?: true
  }

  export type WellShipmentSumAggregateInputType = {
    amount?: true
    roeKsh?: true
  }

  export type WellShipmentMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    refNumber?: true
    clientName?: true
    clientRef?: true
    blNumber?: true
    containerSize?: true
    vesselName?: true
    eta?: true
    status?: true
    health?: true
    healthReason?: true
    currentStage?: true
    assignedOperator?: true
    shippingLine?: true
    origin?: true
    destination?: true
    finalDelivery?: true
    transporter?: true
    docRecv?: true
    lodgeCustoms?: true
    entryNumber?: true
    entryPassed?: true
    tblNtbl?: true
    slineCharges?: true
    slinePaid?: true
    ddRecv?: true
    lastSlingCfs?: true
    lodgedKpa?: true
    dateVerified?: true
    isPaid?: true
    paidAt?: true
    amount?: true
    roeKsh?: true
    invoiceDate?: true
    notes?: true
  }

  export type WellShipmentMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    refNumber?: true
    clientName?: true
    clientRef?: true
    blNumber?: true
    containerSize?: true
    vesselName?: true
    eta?: true
    status?: true
    health?: true
    healthReason?: true
    currentStage?: true
    assignedOperator?: true
    shippingLine?: true
    origin?: true
    destination?: true
    finalDelivery?: true
    transporter?: true
    docRecv?: true
    lodgeCustoms?: true
    entryNumber?: true
    entryPassed?: true
    tblNtbl?: true
    slineCharges?: true
    slinePaid?: true
    ddRecv?: true
    lastSlingCfs?: true
    lodgedKpa?: true
    dateVerified?: true
    isPaid?: true
    paidAt?: true
    amount?: true
    roeKsh?: true
    invoiceDate?: true
    notes?: true
  }

  export type WellShipmentCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    refNumber?: true
    clientName?: true
    clientRef?: true
    blNumber?: true
    containerSize?: true
    vesselName?: true
    eta?: true
    status?: true
    health?: true
    healthReason?: true
    currentStage?: true
    assignedOperator?: true
    shippingLine?: true
    origin?: true
    destination?: true
    finalDelivery?: true
    transporter?: true
    docRecv?: true
    lodgeCustoms?: true
    entryNumber?: true
    entryPassed?: true
    tblNtbl?: true
    slineCharges?: true
    slinePaid?: true
    ddRecv?: true
    lastSlingCfs?: true
    lodgedKpa?: true
    dateVerified?: true
    isPaid?: true
    paidAt?: true
    amount?: true
    roeKsh?: true
    invoiceDate?: true
    notes?: true
    _all?: true
  }

  export type WellShipmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WellShipment to aggregate.
     */
    where?: WellShipmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WellShipments to fetch.
     */
    orderBy?: WellShipmentOrderByWithRelationInput | WellShipmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WellShipmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WellShipments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WellShipments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WellShipments
    **/
    _count?: true | WellShipmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: WellShipmentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: WellShipmentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WellShipmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WellShipmentMaxAggregateInputType
  }

  export type GetWellShipmentAggregateType<T extends WellShipmentAggregateArgs> = {
        [P in keyof T & keyof AggregateWellShipment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWellShipment[P]>
      : GetScalarType<T[P], AggregateWellShipment[P]>
  }




  export type WellShipmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WellShipmentWhereInput
    orderBy?: WellShipmentOrderByWithAggregationInput | WellShipmentOrderByWithAggregationInput[]
    by: WellShipmentScalarFieldEnum[] | WellShipmentScalarFieldEnum
    having?: WellShipmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WellShipmentCountAggregateInputType | true
    _avg?: WellShipmentAvgAggregateInputType
    _sum?: WellShipmentSumAggregateInputType
    _min?: WellShipmentMinAggregateInputType
    _max?: WellShipmentMaxAggregateInputType
  }

  export type WellShipmentGroupByOutputType = {
    id: string
    createdAt: Date
    updatedAt: Date
    refNumber: string
    clientName: string
    clientRef: string | null
    blNumber: string
    containerSize: string
    vesselName: string | null
    eta: Date | null
    status: $Enums.WellShipmentStatus
    health: string
    healthReason: string | null
    currentStage: string | null
    assignedOperator: string | null
    shippingLine: string | null
    origin: string | null
    destination: string | null
    finalDelivery: string | null
    transporter: string | null
    docRecv: string | null
    lodgeCustoms: Date | null
    entryNumber: string | null
    entryPassed: Date | null
    tblNtbl: string | null
    slineCharges: Date | null
    slinePaid: Date | null
    ddRecv: Date | null
    lastSlingCfs: string | null
    lodgedKpa: Date | null
    dateVerified: Date | null
    isPaid: boolean
    paidAt: Date | null
    amount: Decimal | null
    roeKsh: Decimal | null
    invoiceDate: Date | null
    notes: string | null
    _count: WellShipmentCountAggregateOutputType | null
    _avg: WellShipmentAvgAggregateOutputType | null
    _sum: WellShipmentSumAggregateOutputType | null
    _min: WellShipmentMinAggregateOutputType | null
    _max: WellShipmentMaxAggregateOutputType | null
  }

  type GetWellShipmentGroupByPayload<T extends WellShipmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WellShipmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WellShipmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WellShipmentGroupByOutputType[P]>
            : GetScalarType<T[P], WellShipmentGroupByOutputType[P]>
        }
      >
    >


  export type WellShipmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    refNumber?: boolean
    clientName?: boolean
    clientRef?: boolean
    blNumber?: boolean
    containerSize?: boolean
    vesselName?: boolean
    eta?: boolean
    status?: boolean
    health?: boolean
    healthReason?: boolean
    currentStage?: boolean
    assignedOperator?: boolean
    shippingLine?: boolean
    origin?: boolean
    destination?: boolean
    finalDelivery?: boolean
    transporter?: boolean
    docRecv?: boolean
    lodgeCustoms?: boolean
    entryNumber?: boolean
    entryPassed?: boolean
    tblNtbl?: boolean
    slineCharges?: boolean
    slinePaid?: boolean
    ddRecv?: boolean
    lastSlingCfs?: boolean
    lodgedKpa?: boolean
    dateVerified?: boolean
    isPaid?: boolean
    paidAt?: boolean
    amount?: boolean
    roeKsh?: boolean
    invoiceDate?: boolean
    notes?: boolean
    documents?: boolean | WellShipment$documentsArgs<ExtArgs>
    containers?: boolean | WellShipment$containersArgs<ExtArgs>
    events?: boolean | WellShipment$eventsArgs<ExtArgs>
    exceptions?: boolean | WellShipment$exceptionsArgs<ExtArgs>
    notesHistory?: boolean | WellShipment$notesHistoryArgs<ExtArgs>
    _count?: boolean | WellShipmentCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["wellShipment"]>

  export type WellShipmentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    refNumber?: boolean
    clientName?: boolean
    clientRef?: boolean
    blNumber?: boolean
    containerSize?: boolean
    vesselName?: boolean
    eta?: boolean
    status?: boolean
    health?: boolean
    healthReason?: boolean
    currentStage?: boolean
    assignedOperator?: boolean
    shippingLine?: boolean
    origin?: boolean
    destination?: boolean
    finalDelivery?: boolean
    transporter?: boolean
    docRecv?: boolean
    lodgeCustoms?: boolean
    entryNumber?: boolean
    entryPassed?: boolean
    tblNtbl?: boolean
    slineCharges?: boolean
    slinePaid?: boolean
    ddRecv?: boolean
    lastSlingCfs?: boolean
    lodgedKpa?: boolean
    dateVerified?: boolean
    isPaid?: boolean
    paidAt?: boolean
    amount?: boolean
    roeKsh?: boolean
    invoiceDate?: boolean
    notes?: boolean
  }, ExtArgs["result"]["wellShipment"]>

  export type WellShipmentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    refNumber?: boolean
    clientName?: boolean
    clientRef?: boolean
    blNumber?: boolean
    containerSize?: boolean
    vesselName?: boolean
    eta?: boolean
    status?: boolean
    health?: boolean
    healthReason?: boolean
    currentStage?: boolean
    assignedOperator?: boolean
    shippingLine?: boolean
    origin?: boolean
    destination?: boolean
    finalDelivery?: boolean
    transporter?: boolean
    docRecv?: boolean
    lodgeCustoms?: boolean
    entryNumber?: boolean
    entryPassed?: boolean
    tblNtbl?: boolean
    slineCharges?: boolean
    slinePaid?: boolean
    ddRecv?: boolean
    lastSlingCfs?: boolean
    lodgedKpa?: boolean
    dateVerified?: boolean
    isPaid?: boolean
    paidAt?: boolean
    amount?: boolean
    roeKsh?: boolean
    invoiceDate?: boolean
    notes?: boolean
  }, ExtArgs["result"]["wellShipment"]>

  export type WellShipmentSelectScalar = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    refNumber?: boolean
    clientName?: boolean
    clientRef?: boolean
    blNumber?: boolean
    containerSize?: boolean
    vesselName?: boolean
    eta?: boolean
    status?: boolean
    health?: boolean
    healthReason?: boolean
    currentStage?: boolean
    assignedOperator?: boolean
    shippingLine?: boolean
    origin?: boolean
    destination?: boolean
    finalDelivery?: boolean
    transporter?: boolean
    docRecv?: boolean
    lodgeCustoms?: boolean
    entryNumber?: boolean
    entryPassed?: boolean
    tblNtbl?: boolean
    slineCharges?: boolean
    slinePaid?: boolean
    ddRecv?: boolean
    lastSlingCfs?: boolean
    lodgedKpa?: boolean
    dateVerified?: boolean
    isPaid?: boolean
    paidAt?: boolean
    amount?: boolean
    roeKsh?: boolean
    invoiceDate?: boolean
    notes?: boolean
  }

  export type WellShipmentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "updatedAt" | "refNumber" | "clientName" | "clientRef" | "blNumber" | "containerSize" | "vesselName" | "eta" | "status" | "health" | "healthReason" | "currentStage" | "assignedOperator" | "shippingLine" | "origin" | "destination" | "finalDelivery" | "transporter" | "docRecv" | "lodgeCustoms" | "entryNumber" | "entryPassed" | "tblNtbl" | "slineCharges" | "slinePaid" | "ddRecv" | "lastSlingCfs" | "lodgedKpa" | "dateVerified" | "isPaid" | "paidAt" | "amount" | "roeKsh" | "invoiceDate" | "notes", ExtArgs["result"]["wellShipment"]>
  export type WellShipmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    documents?: boolean | WellShipment$documentsArgs<ExtArgs>
    containers?: boolean | WellShipment$containersArgs<ExtArgs>
    events?: boolean | WellShipment$eventsArgs<ExtArgs>
    exceptions?: boolean | WellShipment$exceptionsArgs<ExtArgs>
    notesHistory?: boolean | WellShipment$notesHistoryArgs<ExtArgs>
    _count?: boolean | WellShipmentCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type WellShipmentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type WellShipmentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $WellShipmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WellShipment"
    objects: {
      documents: Prisma.$WellDocumentPayload<ExtArgs>[]
      containers: Prisma.$WellContainerPayload<ExtArgs>[]
      events: Prisma.$WellEventPayload<ExtArgs>[]
      exceptions: Prisma.$WellExceptionPayload<ExtArgs>[]
      notesHistory: Prisma.$WellShipmentNotePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      updatedAt: Date
      refNumber: string
      clientName: string
      clientRef: string | null
      blNumber: string
      containerSize: string
      vesselName: string | null
      eta: Date | null
      status: $Enums.WellShipmentStatus
      health: string
      healthReason: string | null
      currentStage: string | null
      assignedOperator: string | null
      shippingLine: string | null
      origin: string | null
      destination: string | null
      finalDelivery: string | null
      transporter: string | null
      docRecv: string | null
      lodgeCustoms: Date | null
      entryNumber: string | null
      entryPassed: Date | null
      tblNtbl: string | null
      slineCharges: Date | null
      slinePaid: Date | null
      ddRecv: Date | null
      lastSlingCfs: string | null
      lodgedKpa: Date | null
      dateVerified: Date | null
      isPaid: boolean
      paidAt: Date | null
      amount: Prisma.Decimal | null
      roeKsh: Prisma.Decimal | null
      invoiceDate: Date | null
      notes: string | null
    }, ExtArgs["result"]["wellShipment"]>
    composites: {}
  }

  type WellShipmentGetPayload<S extends boolean | null | undefined | WellShipmentDefaultArgs> = $Result.GetResult<Prisma.$WellShipmentPayload, S>

  type WellShipmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WellShipmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WellShipmentCountAggregateInputType | true
    }

  export interface WellShipmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WellShipment'], meta: { name: 'WellShipment' } }
    /**
     * Find zero or one WellShipment that matches the filter.
     * @param {WellShipmentFindUniqueArgs} args - Arguments to find a WellShipment
     * @example
     * // Get one WellShipment
     * const wellShipment = await prisma.wellShipment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WellShipmentFindUniqueArgs>(args: SelectSubset<T, WellShipmentFindUniqueArgs<ExtArgs>>): Prisma__WellShipmentClient<$Result.GetResult<Prisma.$WellShipmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one WellShipment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WellShipmentFindUniqueOrThrowArgs} args - Arguments to find a WellShipment
     * @example
     * // Get one WellShipment
     * const wellShipment = await prisma.wellShipment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WellShipmentFindUniqueOrThrowArgs>(args: SelectSubset<T, WellShipmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WellShipmentClient<$Result.GetResult<Prisma.$WellShipmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WellShipment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WellShipmentFindFirstArgs} args - Arguments to find a WellShipment
     * @example
     * // Get one WellShipment
     * const wellShipment = await prisma.wellShipment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WellShipmentFindFirstArgs>(args?: SelectSubset<T, WellShipmentFindFirstArgs<ExtArgs>>): Prisma__WellShipmentClient<$Result.GetResult<Prisma.$WellShipmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WellShipment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WellShipmentFindFirstOrThrowArgs} args - Arguments to find a WellShipment
     * @example
     * // Get one WellShipment
     * const wellShipment = await prisma.wellShipment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WellShipmentFindFirstOrThrowArgs>(args?: SelectSubset<T, WellShipmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__WellShipmentClient<$Result.GetResult<Prisma.$WellShipmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more WellShipments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WellShipmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WellShipments
     * const wellShipments = await prisma.wellShipment.findMany()
     * 
     * // Get first 10 WellShipments
     * const wellShipments = await prisma.wellShipment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const wellShipmentWithIdOnly = await prisma.wellShipment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WellShipmentFindManyArgs>(args?: SelectSubset<T, WellShipmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WellShipmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a WellShipment.
     * @param {WellShipmentCreateArgs} args - Arguments to create a WellShipment.
     * @example
     * // Create one WellShipment
     * const WellShipment = await prisma.wellShipment.create({
     *   data: {
     *     // ... data to create a WellShipment
     *   }
     * })
     * 
     */
    create<T extends WellShipmentCreateArgs>(args: SelectSubset<T, WellShipmentCreateArgs<ExtArgs>>): Prisma__WellShipmentClient<$Result.GetResult<Prisma.$WellShipmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many WellShipments.
     * @param {WellShipmentCreateManyArgs} args - Arguments to create many WellShipments.
     * @example
     * // Create many WellShipments
     * const wellShipment = await prisma.wellShipment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WellShipmentCreateManyArgs>(args?: SelectSubset<T, WellShipmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many WellShipments and returns the data saved in the database.
     * @param {WellShipmentCreateManyAndReturnArgs} args - Arguments to create many WellShipments.
     * @example
     * // Create many WellShipments
     * const wellShipment = await prisma.wellShipment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many WellShipments and only return the `id`
     * const wellShipmentWithIdOnly = await prisma.wellShipment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WellShipmentCreateManyAndReturnArgs>(args?: SelectSubset<T, WellShipmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WellShipmentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a WellShipment.
     * @param {WellShipmentDeleteArgs} args - Arguments to delete one WellShipment.
     * @example
     * // Delete one WellShipment
     * const WellShipment = await prisma.wellShipment.delete({
     *   where: {
     *     // ... filter to delete one WellShipment
     *   }
     * })
     * 
     */
    delete<T extends WellShipmentDeleteArgs>(args: SelectSubset<T, WellShipmentDeleteArgs<ExtArgs>>): Prisma__WellShipmentClient<$Result.GetResult<Prisma.$WellShipmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one WellShipment.
     * @param {WellShipmentUpdateArgs} args - Arguments to update one WellShipment.
     * @example
     * // Update one WellShipment
     * const wellShipment = await prisma.wellShipment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WellShipmentUpdateArgs>(args: SelectSubset<T, WellShipmentUpdateArgs<ExtArgs>>): Prisma__WellShipmentClient<$Result.GetResult<Prisma.$WellShipmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more WellShipments.
     * @param {WellShipmentDeleteManyArgs} args - Arguments to filter WellShipments to delete.
     * @example
     * // Delete a few WellShipments
     * const { count } = await prisma.wellShipment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WellShipmentDeleteManyArgs>(args?: SelectSubset<T, WellShipmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WellShipments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WellShipmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WellShipments
     * const wellShipment = await prisma.wellShipment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WellShipmentUpdateManyArgs>(args: SelectSubset<T, WellShipmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WellShipments and returns the data updated in the database.
     * @param {WellShipmentUpdateManyAndReturnArgs} args - Arguments to update many WellShipments.
     * @example
     * // Update many WellShipments
     * const wellShipment = await prisma.wellShipment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more WellShipments and only return the `id`
     * const wellShipmentWithIdOnly = await prisma.wellShipment.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends WellShipmentUpdateManyAndReturnArgs>(args: SelectSubset<T, WellShipmentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WellShipmentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one WellShipment.
     * @param {WellShipmentUpsertArgs} args - Arguments to update or create a WellShipment.
     * @example
     * // Update or create a WellShipment
     * const wellShipment = await prisma.wellShipment.upsert({
     *   create: {
     *     // ... data to create a WellShipment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WellShipment we want to update
     *   }
     * })
     */
    upsert<T extends WellShipmentUpsertArgs>(args: SelectSubset<T, WellShipmentUpsertArgs<ExtArgs>>): Prisma__WellShipmentClient<$Result.GetResult<Prisma.$WellShipmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of WellShipments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WellShipmentCountArgs} args - Arguments to filter WellShipments to count.
     * @example
     * // Count the number of WellShipments
     * const count = await prisma.wellShipment.count({
     *   where: {
     *     // ... the filter for the WellShipments we want to count
     *   }
     * })
    **/
    count<T extends WellShipmentCountArgs>(
      args?: Subset<T, WellShipmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WellShipmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WellShipment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WellShipmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WellShipmentAggregateArgs>(args: Subset<T, WellShipmentAggregateArgs>): Prisma.PrismaPromise<GetWellShipmentAggregateType<T>>

    /**
     * Group by WellShipment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WellShipmentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WellShipmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WellShipmentGroupByArgs['orderBy'] }
        : { orderBy?: WellShipmentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WellShipmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWellShipmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WellShipment model
   */
  readonly fields: WellShipmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WellShipment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WellShipmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    documents<T extends WellShipment$documentsArgs<ExtArgs> = {}>(args?: Subset<T, WellShipment$documentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WellDocumentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    containers<T extends WellShipment$containersArgs<ExtArgs> = {}>(args?: Subset<T, WellShipment$containersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WellContainerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    events<T extends WellShipment$eventsArgs<ExtArgs> = {}>(args?: Subset<T, WellShipment$eventsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WellEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    exceptions<T extends WellShipment$exceptionsArgs<ExtArgs> = {}>(args?: Subset<T, WellShipment$exceptionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WellExceptionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    notesHistory<T extends WellShipment$notesHistoryArgs<ExtArgs> = {}>(args?: Subset<T, WellShipment$notesHistoryArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WellShipmentNotePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the WellShipment model
   */
  interface WellShipmentFieldRefs {
    readonly id: FieldRef<"WellShipment", 'String'>
    readonly createdAt: FieldRef<"WellShipment", 'DateTime'>
    readonly updatedAt: FieldRef<"WellShipment", 'DateTime'>
    readonly refNumber: FieldRef<"WellShipment", 'String'>
    readonly clientName: FieldRef<"WellShipment", 'String'>
    readonly clientRef: FieldRef<"WellShipment", 'String'>
    readonly blNumber: FieldRef<"WellShipment", 'String'>
    readonly containerSize: FieldRef<"WellShipment", 'String'>
    readonly vesselName: FieldRef<"WellShipment", 'String'>
    readonly eta: FieldRef<"WellShipment", 'DateTime'>
    readonly status: FieldRef<"WellShipment", 'WellShipmentStatus'>
    readonly health: FieldRef<"WellShipment", 'String'>
    readonly healthReason: FieldRef<"WellShipment", 'String'>
    readonly currentStage: FieldRef<"WellShipment", 'String'>
    readonly assignedOperator: FieldRef<"WellShipment", 'String'>
    readonly shippingLine: FieldRef<"WellShipment", 'String'>
    readonly origin: FieldRef<"WellShipment", 'String'>
    readonly destination: FieldRef<"WellShipment", 'String'>
    readonly finalDelivery: FieldRef<"WellShipment", 'String'>
    readonly transporter: FieldRef<"WellShipment", 'String'>
    readonly docRecv: FieldRef<"WellShipment", 'String'>
    readonly lodgeCustoms: FieldRef<"WellShipment", 'DateTime'>
    readonly entryNumber: FieldRef<"WellShipment", 'String'>
    readonly entryPassed: FieldRef<"WellShipment", 'DateTime'>
    readonly tblNtbl: FieldRef<"WellShipment", 'String'>
    readonly slineCharges: FieldRef<"WellShipment", 'DateTime'>
    readonly slinePaid: FieldRef<"WellShipment", 'DateTime'>
    readonly ddRecv: FieldRef<"WellShipment", 'DateTime'>
    readonly lastSlingCfs: FieldRef<"WellShipment", 'String'>
    readonly lodgedKpa: FieldRef<"WellShipment", 'DateTime'>
    readonly dateVerified: FieldRef<"WellShipment", 'DateTime'>
    readonly isPaid: FieldRef<"WellShipment", 'Boolean'>
    readonly paidAt: FieldRef<"WellShipment", 'DateTime'>
    readonly amount: FieldRef<"WellShipment", 'Decimal'>
    readonly roeKsh: FieldRef<"WellShipment", 'Decimal'>
    readonly invoiceDate: FieldRef<"WellShipment", 'DateTime'>
    readonly notes: FieldRef<"WellShipment", 'String'>
  }
    

  // Custom InputTypes
  /**
   * WellShipment findUnique
   */
  export type WellShipmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WellShipment
     */
    select?: WellShipmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WellShipment
     */
    omit?: WellShipmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WellShipmentInclude<ExtArgs> | null
    /**
     * Filter, which WellShipment to fetch.
     */
    where: WellShipmentWhereUniqueInput
  }

  /**
   * WellShipment findUniqueOrThrow
   */
  export type WellShipmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WellShipment
     */
    select?: WellShipmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WellShipment
     */
    omit?: WellShipmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WellShipmentInclude<ExtArgs> | null
    /**
     * Filter, which WellShipment to fetch.
     */
    where: WellShipmentWhereUniqueInput
  }

  /**
   * WellShipment findFirst
   */
  export type WellShipmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WellShipment
     */
    select?: WellShipmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WellShipment
     */
    omit?: WellShipmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WellShipmentInclude<ExtArgs> | null
    /**
     * Filter, which WellShipment to fetch.
     */
    where?: WellShipmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WellShipments to fetch.
     */
    orderBy?: WellShipmentOrderByWithRelationInput | WellShipmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WellShipments.
     */
    cursor?: WellShipmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WellShipments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WellShipments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WellShipments.
     */
    distinct?: WellShipmentScalarFieldEnum | WellShipmentScalarFieldEnum[]
  }

  /**
   * WellShipment findFirstOrThrow
   */
  export type WellShipmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WellShipment
     */
    select?: WellShipmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WellShipment
     */
    omit?: WellShipmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WellShipmentInclude<ExtArgs> | null
    /**
     * Filter, which WellShipment to fetch.
     */
    where?: WellShipmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WellShipments to fetch.
     */
    orderBy?: WellShipmentOrderByWithRelationInput | WellShipmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WellShipments.
     */
    cursor?: WellShipmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WellShipments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WellShipments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WellShipments.
     */
    distinct?: WellShipmentScalarFieldEnum | WellShipmentScalarFieldEnum[]
  }

  /**
   * WellShipment findMany
   */
  export type WellShipmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WellShipment
     */
    select?: WellShipmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WellShipment
     */
    omit?: WellShipmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WellShipmentInclude<ExtArgs> | null
    /**
     * Filter, which WellShipments to fetch.
     */
    where?: WellShipmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WellShipments to fetch.
     */
    orderBy?: WellShipmentOrderByWithRelationInput | WellShipmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WellShipments.
     */
    cursor?: WellShipmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WellShipments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WellShipments.
     */
    skip?: number
    distinct?: WellShipmentScalarFieldEnum | WellShipmentScalarFieldEnum[]
  }

  /**
   * WellShipment create
   */
  export type WellShipmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WellShipment
     */
    select?: WellShipmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WellShipment
     */
    omit?: WellShipmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WellShipmentInclude<ExtArgs> | null
    /**
     * The data needed to create a WellShipment.
     */
    data: XOR<WellShipmentCreateInput, WellShipmentUncheckedCreateInput>
  }

  /**
   * WellShipment createMany
   */
  export type WellShipmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many WellShipments.
     */
    data: WellShipmentCreateManyInput | WellShipmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WellShipment createManyAndReturn
   */
  export type WellShipmentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WellShipment
     */
    select?: WellShipmentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WellShipment
     */
    omit?: WellShipmentOmit<ExtArgs> | null
    /**
     * The data used to create many WellShipments.
     */
    data: WellShipmentCreateManyInput | WellShipmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WellShipment update
   */
  export type WellShipmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WellShipment
     */
    select?: WellShipmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WellShipment
     */
    omit?: WellShipmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WellShipmentInclude<ExtArgs> | null
    /**
     * The data needed to update a WellShipment.
     */
    data: XOR<WellShipmentUpdateInput, WellShipmentUncheckedUpdateInput>
    /**
     * Choose, which WellShipment to update.
     */
    where: WellShipmentWhereUniqueInput
  }

  /**
   * WellShipment updateMany
   */
  export type WellShipmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WellShipments.
     */
    data: XOR<WellShipmentUpdateManyMutationInput, WellShipmentUncheckedUpdateManyInput>
    /**
     * Filter which WellShipments to update
     */
    where?: WellShipmentWhereInput
    /**
     * Limit how many WellShipments to update.
     */
    limit?: number
  }

  /**
   * WellShipment updateManyAndReturn
   */
  export type WellShipmentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WellShipment
     */
    select?: WellShipmentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WellShipment
     */
    omit?: WellShipmentOmit<ExtArgs> | null
    /**
     * The data used to update WellShipments.
     */
    data: XOR<WellShipmentUpdateManyMutationInput, WellShipmentUncheckedUpdateManyInput>
    /**
     * Filter which WellShipments to update
     */
    where?: WellShipmentWhereInput
    /**
     * Limit how many WellShipments to update.
     */
    limit?: number
  }

  /**
   * WellShipment upsert
   */
  export type WellShipmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WellShipment
     */
    select?: WellShipmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WellShipment
     */
    omit?: WellShipmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WellShipmentInclude<ExtArgs> | null
    /**
     * The filter to search for the WellShipment to update in case it exists.
     */
    where: WellShipmentWhereUniqueInput
    /**
     * In case the WellShipment found by the `where` argument doesn't exist, create a new WellShipment with this data.
     */
    create: XOR<WellShipmentCreateInput, WellShipmentUncheckedCreateInput>
    /**
     * In case the WellShipment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WellShipmentUpdateInput, WellShipmentUncheckedUpdateInput>
  }

  /**
   * WellShipment delete
   */
  export type WellShipmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WellShipment
     */
    select?: WellShipmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WellShipment
     */
    omit?: WellShipmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WellShipmentInclude<ExtArgs> | null
    /**
     * Filter which WellShipment to delete.
     */
    where: WellShipmentWhereUniqueInput
  }

  /**
   * WellShipment deleteMany
   */
  export type WellShipmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WellShipments to delete
     */
    where?: WellShipmentWhereInput
    /**
     * Limit how many WellShipments to delete.
     */
    limit?: number
  }

  /**
   * WellShipment.documents
   */
  export type WellShipment$documentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WellDocument
     */
    select?: WellDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WellDocument
     */
    omit?: WellDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WellDocumentInclude<ExtArgs> | null
    where?: WellDocumentWhereInput
    orderBy?: WellDocumentOrderByWithRelationInput | WellDocumentOrderByWithRelationInput[]
    cursor?: WellDocumentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WellDocumentScalarFieldEnum | WellDocumentScalarFieldEnum[]
  }

  /**
   * WellShipment.containers
   */
  export type WellShipment$containersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WellContainer
     */
    select?: WellContainerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WellContainer
     */
    omit?: WellContainerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WellContainerInclude<ExtArgs> | null
    where?: WellContainerWhereInput
    orderBy?: WellContainerOrderByWithRelationInput | WellContainerOrderByWithRelationInput[]
    cursor?: WellContainerWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WellContainerScalarFieldEnum | WellContainerScalarFieldEnum[]
  }

  /**
   * WellShipment.events
   */
  export type WellShipment$eventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WellEvent
     */
    select?: WellEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WellEvent
     */
    omit?: WellEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WellEventInclude<ExtArgs> | null
    where?: WellEventWhereInput
    orderBy?: WellEventOrderByWithRelationInput | WellEventOrderByWithRelationInput[]
    cursor?: WellEventWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WellEventScalarFieldEnum | WellEventScalarFieldEnum[]
  }

  /**
   * WellShipment.exceptions
   */
  export type WellShipment$exceptionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WellException
     */
    select?: WellExceptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WellException
     */
    omit?: WellExceptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WellExceptionInclude<ExtArgs> | null
    where?: WellExceptionWhereInput
    orderBy?: WellExceptionOrderByWithRelationInput | WellExceptionOrderByWithRelationInput[]
    cursor?: WellExceptionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WellExceptionScalarFieldEnum | WellExceptionScalarFieldEnum[]
  }

  /**
   * WellShipment.notesHistory
   */
  export type WellShipment$notesHistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WellShipmentNote
     */
    select?: WellShipmentNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WellShipmentNote
     */
    omit?: WellShipmentNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WellShipmentNoteInclude<ExtArgs> | null
    where?: WellShipmentNoteWhereInput
    orderBy?: WellShipmentNoteOrderByWithRelationInput | WellShipmentNoteOrderByWithRelationInput[]
    cursor?: WellShipmentNoteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WellShipmentNoteScalarFieldEnum | WellShipmentNoteScalarFieldEnum[]
  }

  /**
   * WellShipment without action
   */
  export type WellShipmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WellShipment
     */
    select?: WellShipmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WellShipment
     */
    omit?: WellShipmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WellShipmentInclude<ExtArgs> | null
  }


  /**
   * Model WellEvent
   */

  export type AggregateWellEvent = {
    _count: WellEventCountAggregateOutputType | null
    _min: WellEventMinAggregateOutputType | null
    _max: WellEventMaxAggregateOutputType | null
  }

  export type WellEventMinAggregateOutputType = {
    id: string | null
    shipmentId: string | null
    title: string | null
    description: string | null
    stage: string | null
    source: string | null
    updatedBy: string | null
    reference: string | null
    createdAt: Date | null
  }

  export type WellEventMaxAggregateOutputType = {
    id: string | null
    shipmentId: string | null
    title: string | null
    description: string | null
    stage: string | null
    source: string | null
    updatedBy: string | null
    reference: string | null
    createdAt: Date | null
  }

  export type WellEventCountAggregateOutputType = {
    id: number
    shipmentId: number
    title: number
    description: number
    stage: number
    source: number
    updatedBy: number
    reference: number
    createdAt: number
    _all: number
  }


  export type WellEventMinAggregateInputType = {
    id?: true
    shipmentId?: true
    title?: true
    description?: true
    stage?: true
    source?: true
    updatedBy?: true
    reference?: true
    createdAt?: true
  }

  export type WellEventMaxAggregateInputType = {
    id?: true
    shipmentId?: true
    title?: true
    description?: true
    stage?: true
    source?: true
    updatedBy?: true
    reference?: true
    createdAt?: true
  }

  export type WellEventCountAggregateInputType = {
    id?: true
    shipmentId?: true
    title?: true
    description?: true
    stage?: true
    source?: true
    updatedBy?: true
    reference?: true
    createdAt?: true
    _all?: true
  }

  export type WellEventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WellEvent to aggregate.
     */
    where?: WellEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WellEvents to fetch.
     */
    orderBy?: WellEventOrderByWithRelationInput | WellEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WellEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WellEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WellEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WellEvents
    **/
    _count?: true | WellEventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WellEventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WellEventMaxAggregateInputType
  }

  export type GetWellEventAggregateType<T extends WellEventAggregateArgs> = {
        [P in keyof T & keyof AggregateWellEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWellEvent[P]>
      : GetScalarType<T[P], AggregateWellEvent[P]>
  }




  export type WellEventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WellEventWhereInput
    orderBy?: WellEventOrderByWithAggregationInput | WellEventOrderByWithAggregationInput[]
    by: WellEventScalarFieldEnum[] | WellEventScalarFieldEnum
    having?: WellEventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WellEventCountAggregateInputType | true
    _min?: WellEventMinAggregateInputType
    _max?: WellEventMaxAggregateInputType
  }

  export type WellEventGroupByOutputType = {
    id: string
    shipmentId: string
    title: string
    description: string | null
    stage: string | null
    source: string
    updatedBy: string
    reference: string | null
    createdAt: Date
    _count: WellEventCountAggregateOutputType | null
    _min: WellEventMinAggregateOutputType | null
    _max: WellEventMaxAggregateOutputType | null
  }

  type GetWellEventGroupByPayload<T extends WellEventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WellEventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WellEventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WellEventGroupByOutputType[P]>
            : GetScalarType<T[P], WellEventGroupByOutputType[P]>
        }
      >
    >


  export type WellEventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    shipmentId?: boolean
    title?: boolean
    description?: boolean
    stage?: boolean
    source?: boolean
    updatedBy?: boolean
    reference?: boolean
    createdAt?: boolean
    shipment?: boolean | WellShipmentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["wellEvent"]>

  export type WellEventSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    shipmentId?: boolean
    title?: boolean
    description?: boolean
    stage?: boolean
    source?: boolean
    updatedBy?: boolean
    reference?: boolean
    createdAt?: boolean
    shipment?: boolean | WellShipmentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["wellEvent"]>

  export type WellEventSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    shipmentId?: boolean
    title?: boolean
    description?: boolean
    stage?: boolean
    source?: boolean
    updatedBy?: boolean
    reference?: boolean
    createdAt?: boolean
    shipment?: boolean | WellShipmentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["wellEvent"]>

  export type WellEventSelectScalar = {
    id?: boolean
    shipmentId?: boolean
    title?: boolean
    description?: boolean
    stage?: boolean
    source?: boolean
    updatedBy?: boolean
    reference?: boolean
    createdAt?: boolean
  }

  export type WellEventOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "shipmentId" | "title" | "description" | "stage" | "source" | "updatedBy" | "reference" | "createdAt", ExtArgs["result"]["wellEvent"]>
  export type WellEventInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    shipment?: boolean | WellShipmentDefaultArgs<ExtArgs>
  }
  export type WellEventIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    shipment?: boolean | WellShipmentDefaultArgs<ExtArgs>
  }
  export type WellEventIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    shipment?: boolean | WellShipmentDefaultArgs<ExtArgs>
  }

  export type $WellEventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WellEvent"
    objects: {
      shipment: Prisma.$WellShipmentPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      shipmentId: string
      title: string
      description: string | null
      stage: string | null
      source: string
      updatedBy: string
      reference: string | null
      createdAt: Date
    }, ExtArgs["result"]["wellEvent"]>
    composites: {}
  }

  type WellEventGetPayload<S extends boolean | null | undefined | WellEventDefaultArgs> = $Result.GetResult<Prisma.$WellEventPayload, S>

  type WellEventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WellEventFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WellEventCountAggregateInputType | true
    }

  export interface WellEventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WellEvent'], meta: { name: 'WellEvent' } }
    /**
     * Find zero or one WellEvent that matches the filter.
     * @param {WellEventFindUniqueArgs} args - Arguments to find a WellEvent
     * @example
     * // Get one WellEvent
     * const wellEvent = await prisma.wellEvent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WellEventFindUniqueArgs>(args: SelectSubset<T, WellEventFindUniqueArgs<ExtArgs>>): Prisma__WellEventClient<$Result.GetResult<Prisma.$WellEventPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one WellEvent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WellEventFindUniqueOrThrowArgs} args - Arguments to find a WellEvent
     * @example
     * // Get one WellEvent
     * const wellEvent = await prisma.wellEvent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WellEventFindUniqueOrThrowArgs>(args: SelectSubset<T, WellEventFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WellEventClient<$Result.GetResult<Prisma.$WellEventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WellEvent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WellEventFindFirstArgs} args - Arguments to find a WellEvent
     * @example
     * // Get one WellEvent
     * const wellEvent = await prisma.wellEvent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WellEventFindFirstArgs>(args?: SelectSubset<T, WellEventFindFirstArgs<ExtArgs>>): Prisma__WellEventClient<$Result.GetResult<Prisma.$WellEventPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WellEvent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WellEventFindFirstOrThrowArgs} args - Arguments to find a WellEvent
     * @example
     * // Get one WellEvent
     * const wellEvent = await prisma.wellEvent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WellEventFindFirstOrThrowArgs>(args?: SelectSubset<T, WellEventFindFirstOrThrowArgs<ExtArgs>>): Prisma__WellEventClient<$Result.GetResult<Prisma.$WellEventPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more WellEvents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WellEventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WellEvents
     * const wellEvents = await prisma.wellEvent.findMany()
     * 
     * // Get first 10 WellEvents
     * const wellEvents = await prisma.wellEvent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const wellEventWithIdOnly = await prisma.wellEvent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WellEventFindManyArgs>(args?: SelectSubset<T, WellEventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WellEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a WellEvent.
     * @param {WellEventCreateArgs} args - Arguments to create a WellEvent.
     * @example
     * // Create one WellEvent
     * const WellEvent = await prisma.wellEvent.create({
     *   data: {
     *     // ... data to create a WellEvent
     *   }
     * })
     * 
     */
    create<T extends WellEventCreateArgs>(args: SelectSubset<T, WellEventCreateArgs<ExtArgs>>): Prisma__WellEventClient<$Result.GetResult<Prisma.$WellEventPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many WellEvents.
     * @param {WellEventCreateManyArgs} args - Arguments to create many WellEvents.
     * @example
     * // Create many WellEvents
     * const wellEvent = await prisma.wellEvent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WellEventCreateManyArgs>(args?: SelectSubset<T, WellEventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many WellEvents and returns the data saved in the database.
     * @param {WellEventCreateManyAndReturnArgs} args - Arguments to create many WellEvents.
     * @example
     * // Create many WellEvents
     * const wellEvent = await prisma.wellEvent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many WellEvents and only return the `id`
     * const wellEventWithIdOnly = await prisma.wellEvent.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WellEventCreateManyAndReturnArgs>(args?: SelectSubset<T, WellEventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WellEventPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a WellEvent.
     * @param {WellEventDeleteArgs} args - Arguments to delete one WellEvent.
     * @example
     * // Delete one WellEvent
     * const WellEvent = await prisma.wellEvent.delete({
     *   where: {
     *     // ... filter to delete one WellEvent
     *   }
     * })
     * 
     */
    delete<T extends WellEventDeleteArgs>(args: SelectSubset<T, WellEventDeleteArgs<ExtArgs>>): Prisma__WellEventClient<$Result.GetResult<Prisma.$WellEventPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one WellEvent.
     * @param {WellEventUpdateArgs} args - Arguments to update one WellEvent.
     * @example
     * // Update one WellEvent
     * const wellEvent = await prisma.wellEvent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WellEventUpdateArgs>(args: SelectSubset<T, WellEventUpdateArgs<ExtArgs>>): Prisma__WellEventClient<$Result.GetResult<Prisma.$WellEventPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more WellEvents.
     * @param {WellEventDeleteManyArgs} args - Arguments to filter WellEvents to delete.
     * @example
     * // Delete a few WellEvents
     * const { count } = await prisma.wellEvent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WellEventDeleteManyArgs>(args?: SelectSubset<T, WellEventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WellEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WellEventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WellEvents
     * const wellEvent = await prisma.wellEvent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WellEventUpdateManyArgs>(args: SelectSubset<T, WellEventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WellEvents and returns the data updated in the database.
     * @param {WellEventUpdateManyAndReturnArgs} args - Arguments to update many WellEvents.
     * @example
     * // Update many WellEvents
     * const wellEvent = await prisma.wellEvent.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more WellEvents and only return the `id`
     * const wellEventWithIdOnly = await prisma.wellEvent.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends WellEventUpdateManyAndReturnArgs>(args: SelectSubset<T, WellEventUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WellEventPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one WellEvent.
     * @param {WellEventUpsertArgs} args - Arguments to update or create a WellEvent.
     * @example
     * // Update or create a WellEvent
     * const wellEvent = await prisma.wellEvent.upsert({
     *   create: {
     *     // ... data to create a WellEvent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WellEvent we want to update
     *   }
     * })
     */
    upsert<T extends WellEventUpsertArgs>(args: SelectSubset<T, WellEventUpsertArgs<ExtArgs>>): Prisma__WellEventClient<$Result.GetResult<Prisma.$WellEventPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of WellEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WellEventCountArgs} args - Arguments to filter WellEvents to count.
     * @example
     * // Count the number of WellEvents
     * const count = await prisma.wellEvent.count({
     *   where: {
     *     // ... the filter for the WellEvents we want to count
     *   }
     * })
    **/
    count<T extends WellEventCountArgs>(
      args?: Subset<T, WellEventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WellEventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WellEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WellEventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WellEventAggregateArgs>(args: Subset<T, WellEventAggregateArgs>): Prisma.PrismaPromise<GetWellEventAggregateType<T>>

    /**
     * Group by WellEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WellEventGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WellEventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WellEventGroupByArgs['orderBy'] }
        : { orderBy?: WellEventGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WellEventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWellEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WellEvent model
   */
  readonly fields: WellEventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WellEvent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WellEventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    shipment<T extends WellShipmentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, WellShipmentDefaultArgs<ExtArgs>>): Prisma__WellShipmentClient<$Result.GetResult<Prisma.$WellShipmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the WellEvent model
   */
  interface WellEventFieldRefs {
    readonly id: FieldRef<"WellEvent", 'String'>
    readonly shipmentId: FieldRef<"WellEvent", 'String'>
    readonly title: FieldRef<"WellEvent", 'String'>
    readonly description: FieldRef<"WellEvent", 'String'>
    readonly stage: FieldRef<"WellEvent", 'String'>
    readonly source: FieldRef<"WellEvent", 'String'>
    readonly updatedBy: FieldRef<"WellEvent", 'String'>
    readonly reference: FieldRef<"WellEvent", 'String'>
    readonly createdAt: FieldRef<"WellEvent", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * WellEvent findUnique
   */
  export type WellEventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WellEvent
     */
    select?: WellEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WellEvent
     */
    omit?: WellEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WellEventInclude<ExtArgs> | null
    /**
     * Filter, which WellEvent to fetch.
     */
    where: WellEventWhereUniqueInput
  }

  /**
   * WellEvent findUniqueOrThrow
   */
  export type WellEventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WellEvent
     */
    select?: WellEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WellEvent
     */
    omit?: WellEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WellEventInclude<ExtArgs> | null
    /**
     * Filter, which WellEvent to fetch.
     */
    where: WellEventWhereUniqueInput
  }

  /**
   * WellEvent findFirst
   */
  export type WellEventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WellEvent
     */
    select?: WellEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WellEvent
     */
    omit?: WellEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WellEventInclude<ExtArgs> | null
    /**
     * Filter, which WellEvent to fetch.
     */
    where?: WellEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WellEvents to fetch.
     */
    orderBy?: WellEventOrderByWithRelationInput | WellEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WellEvents.
     */
    cursor?: WellEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WellEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WellEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WellEvents.
     */
    distinct?: WellEventScalarFieldEnum | WellEventScalarFieldEnum[]
  }

  /**
   * WellEvent findFirstOrThrow
   */
  export type WellEventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WellEvent
     */
    select?: WellEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WellEvent
     */
    omit?: WellEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WellEventInclude<ExtArgs> | null
    /**
     * Filter, which WellEvent to fetch.
     */
    where?: WellEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WellEvents to fetch.
     */
    orderBy?: WellEventOrderByWithRelationInput | WellEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WellEvents.
     */
    cursor?: WellEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WellEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WellEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WellEvents.
     */
    distinct?: WellEventScalarFieldEnum | WellEventScalarFieldEnum[]
  }

  /**
   * WellEvent findMany
   */
  export type WellEventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WellEvent
     */
    select?: WellEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WellEvent
     */
    omit?: WellEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WellEventInclude<ExtArgs> | null
    /**
     * Filter, which WellEvents to fetch.
     */
    where?: WellEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WellEvents to fetch.
     */
    orderBy?: WellEventOrderByWithRelationInput | WellEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WellEvents.
     */
    cursor?: WellEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WellEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WellEvents.
     */
    skip?: number
    distinct?: WellEventScalarFieldEnum | WellEventScalarFieldEnum[]
  }

  /**
   * WellEvent create
   */
  export type WellEventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WellEvent
     */
    select?: WellEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WellEvent
     */
    omit?: WellEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WellEventInclude<ExtArgs> | null
    /**
     * The data needed to create a WellEvent.
     */
    data: XOR<WellEventCreateInput, WellEventUncheckedCreateInput>
  }

  /**
   * WellEvent createMany
   */
  export type WellEventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many WellEvents.
     */
    data: WellEventCreateManyInput | WellEventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WellEvent createManyAndReturn
   */
  export type WellEventCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WellEvent
     */
    select?: WellEventSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WellEvent
     */
    omit?: WellEventOmit<ExtArgs> | null
    /**
     * The data used to create many WellEvents.
     */
    data: WellEventCreateManyInput | WellEventCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WellEventIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * WellEvent update
   */
  export type WellEventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WellEvent
     */
    select?: WellEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WellEvent
     */
    omit?: WellEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WellEventInclude<ExtArgs> | null
    /**
     * The data needed to update a WellEvent.
     */
    data: XOR<WellEventUpdateInput, WellEventUncheckedUpdateInput>
    /**
     * Choose, which WellEvent to update.
     */
    where: WellEventWhereUniqueInput
  }

  /**
   * WellEvent updateMany
   */
  export type WellEventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WellEvents.
     */
    data: XOR<WellEventUpdateManyMutationInput, WellEventUncheckedUpdateManyInput>
    /**
     * Filter which WellEvents to update
     */
    where?: WellEventWhereInput
    /**
     * Limit how many WellEvents to update.
     */
    limit?: number
  }

  /**
   * WellEvent updateManyAndReturn
   */
  export type WellEventUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WellEvent
     */
    select?: WellEventSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WellEvent
     */
    omit?: WellEventOmit<ExtArgs> | null
    /**
     * The data used to update WellEvents.
     */
    data: XOR<WellEventUpdateManyMutationInput, WellEventUncheckedUpdateManyInput>
    /**
     * Filter which WellEvents to update
     */
    where?: WellEventWhereInput
    /**
     * Limit how many WellEvents to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WellEventIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * WellEvent upsert
   */
  export type WellEventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WellEvent
     */
    select?: WellEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WellEvent
     */
    omit?: WellEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WellEventInclude<ExtArgs> | null
    /**
     * The filter to search for the WellEvent to update in case it exists.
     */
    where: WellEventWhereUniqueInput
    /**
     * In case the WellEvent found by the `where` argument doesn't exist, create a new WellEvent with this data.
     */
    create: XOR<WellEventCreateInput, WellEventUncheckedCreateInput>
    /**
     * In case the WellEvent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WellEventUpdateInput, WellEventUncheckedUpdateInput>
  }

  /**
   * WellEvent delete
   */
  export type WellEventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WellEvent
     */
    select?: WellEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WellEvent
     */
    omit?: WellEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WellEventInclude<ExtArgs> | null
    /**
     * Filter which WellEvent to delete.
     */
    where: WellEventWhereUniqueInput
  }

  /**
   * WellEvent deleteMany
   */
  export type WellEventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WellEvents to delete
     */
    where?: WellEventWhereInput
    /**
     * Limit how many WellEvents to delete.
     */
    limit?: number
  }

  /**
   * WellEvent without action
   */
  export type WellEventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WellEvent
     */
    select?: WellEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WellEvent
     */
    omit?: WellEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WellEventInclude<ExtArgs> | null
  }


  /**
   * Model WellException
   */

  export type AggregateWellException = {
    _count: WellExceptionCountAggregateOutputType | null
    _min: WellExceptionMinAggregateOutputType | null
    _max: WellExceptionMaxAggregateOutputType | null
  }

  export type WellExceptionMinAggregateOutputType = {
    id: string | null
    shipmentId: string | null
    containerId: string | null
    issueType: string | null
    severity: string | null
    status: string | null
    description: string | null
    expectedResolution: string | null
    assignedTo: string | null
    dueDate: Date | null
    createdBy: string | null
    createdAt: Date | null
    resolvedAt: Date | null
    resolvedBy: string | null
  }

  export type WellExceptionMaxAggregateOutputType = {
    id: string | null
    shipmentId: string | null
    containerId: string | null
    issueType: string | null
    severity: string | null
    status: string | null
    description: string | null
    expectedResolution: string | null
    assignedTo: string | null
    dueDate: Date | null
    createdBy: string | null
    createdAt: Date | null
    resolvedAt: Date | null
    resolvedBy: string | null
  }

  export type WellExceptionCountAggregateOutputType = {
    id: number
    shipmentId: number
    containerId: number
    issueType: number
    severity: number
    status: number
    description: number
    expectedResolution: number
    assignedTo: number
    dueDate: number
    createdBy: number
    createdAt: number
    resolvedAt: number
    resolvedBy: number
    _all: number
  }


  export type WellExceptionMinAggregateInputType = {
    id?: true
    shipmentId?: true
    containerId?: true
    issueType?: true
    severity?: true
    status?: true
    description?: true
    expectedResolution?: true
    assignedTo?: true
    dueDate?: true
    createdBy?: true
    createdAt?: true
    resolvedAt?: true
    resolvedBy?: true
  }

  export type WellExceptionMaxAggregateInputType = {
    id?: true
    shipmentId?: true
    containerId?: true
    issueType?: true
    severity?: true
    status?: true
    description?: true
    expectedResolution?: true
    assignedTo?: true
    dueDate?: true
    createdBy?: true
    createdAt?: true
    resolvedAt?: true
    resolvedBy?: true
  }

  export type WellExceptionCountAggregateInputType = {
    id?: true
    shipmentId?: true
    containerId?: true
    issueType?: true
    severity?: true
    status?: true
    description?: true
    expectedResolution?: true
    assignedTo?: true
    dueDate?: true
    createdBy?: true
    createdAt?: true
    resolvedAt?: true
    resolvedBy?: true
    _all?: true
  }

  export type WellExceptionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WellException to aggregate.
     */
    where?: WellExceptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WellExceptions to fetch.
     */
    orderBy?: WellExceptionOrderByWithRelationInput | WellExceptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WellExceptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WellExceptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WellExceptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WellExceptions
    **/
    _count?: true | WellExceptionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WellExceptionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WellExceptionMaxAggregateInputType
  }

  export type GetWellExceptionAggregateType<T extends WellExceptionAggregateArgs> = {
        [P in keyof T & keyof AggregateWellException]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWellException[P]>
      : GetScalarType<T[P], AggregateWellException[P]>
  }




  export type WellExceptionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WellExceptionWhereInput
    orderBy?: WellExceptionOrderByWithAggregationInput | WellExceptionOrderByWithAggregationInput[]
    by: WellExceptionScalarFieldEnum[] | WellExceptionScalarFieldEnum
    having?: WellExceptionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WellExceptionCountAggregateInputType | true
    _min?: WellExceptionMinAggregateInputType
    _max?: WellExceptionMaxAggregateInputType
  }

  export type WellExceptionGroupByOutputType = {
    id: string
    shipmentId: string
    containerId: string | null
    issueType: string
    severity: string
    status: string
    description: string
    expectedResolution: string | null
    assignedTo: string | null
    dueDate: Date | null
    createdBy: string
    createdAt: Date
    resolvedAt: Date | null
    resolvedBy: string | null
    _count: WellExceptionCountAggregateOutputType | null
    _min: WellExceptionMinAggregateOutputType | null
    _max: WellExceptionMaxAggregateOutputType | null
  }

  type GetWellExceptionGroupByPayload<T extends WellExceptionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WellExceptionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WellExceptionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WellExceptionGroupByOutputType[P]>
            : GetScalarType<T[P], WellExceptionGroupByOutputType[P]>
        }
      >
    >


  export type WellExceptionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    shipmentId?: boolean
    containerId?: boolean
    issueType?: boolean
    severity?: boolean
    status?: boolean
    description?: boolean
    expectedResolution?: boolean
    assignedTo?: boolean
    dueDate?: boolean
    createdBy?: boolean
    createdAt?: boolean
    resolvedAt?: boolean
    resolvedBy?: boolean
    shipment?: boolean | WellShipmentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["wellException"]>

  export type WellExceptionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    shipmentId?: boolean
    containerId?: boolean
    issueType?: boolean
    severity?: boolean
    status?: boolean
    description?: boolean
    expectedResolution?: boolean
    assignedTo?: boolean
    dueDate?: boolean
    createdBy?: boolean
    createdAt?: boolean
    resolvedAt?: boolean
    resolvedBy?: boolean
    shipment?: boolean | WellShipmentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["wellException"]>

  export type WellExceptionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    shipmentId?: boolean
    containerId?: boolean
    issueType?: boolean
    severity?: boolean
    status?: boolean
    description?: boolean
    expectedResolution?: boolean
    assignedTo?: boolean
    dueDate?: boolean
    createdBy?: boolean
    createdAt?: boolean
    resolvedAt?: boolean
    resolvedBy?: boolean
    shipment?: boolean | WellShipmentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["wellException"]>

  export type WellExceptionSelectScalar = {
    id?: boolean
    shipmentId?: boolean
    containerId?: boolean
    issueType?: boolean
    severity?: boolean
    status?: boolean
    description?: boolean
    expectedResolution?: boolean
    assignedTo?: boolean
    dueDate?: boolean
    createdBy?: boolean
    createdAt?: boolean
    resolvedAt?: boolean
    resolvedBy?: boolean
  }

  export type WellExceptionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "shipmentId" | "containerId" | "issueType" | "severity" | "status" | "description" | "expectedResolution" | "assignedTo" | "dueDate" | "createdBy" | "createdAt" | "resolvedAt" | "resolvedBy", ExtArgs["result"]["wellException"]>
  export type WellExceptionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    shipment?: boolean | WellShipmentDefaultArgs<ExtArgs>
  }
  export type WellExceptionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    shipment?: boolean | WellShipmentDefaultArgs<ExtArgs>
  }
  export type WellExceptionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    shipment?: boolean | WellShipmentDefaultArgs<ExtArgs>
  }

  export type $WellExceptionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WellException"
    objects: {
      shipment: Prisma.$WellShipmentPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      shipmentId: string
      containerId: string | null
      issueType: string
      severity: string
      status: string
      description: string
      expectedResolution: string | null
      assignedTo: string | null
      dueDate: Date | null
      createdBy: string
      createdAt: Date
      resolvedAt: Date | null
      resolvedBy: string | null
    }, ExtArgs["result"]["wellException"]>
    composites: {}
  }

  type WellExceptionGetPayload<S extends boolean | null | undefined | WellExceptionDefaultArgs> = $Result.GetResult<Prisma.$WellExceptionPayload, S>

  type WellExceptionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WellExceptionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WellExceptionCountAggregateInputType | true
    }

  export interface WellExceptionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WellException'], meta: { name: 'WellException' } }
    /**
     * Find zero or one WellException that matches the filter.
     * @param {WellExceptionFindUniqueArgs} args - Arguments to find a WellException
     * @example
     * // Get one WellException
     * const wellException = await prisma.wellException.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WellExceptionFindUniqueArgs>(args: SelectSubset<T, WellExceptionFindUniqueArgs<ExtArgs>>): Prisma__WellExceptionClient<$Result.GetResult<Prisma.$WellExceptionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one WellException that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WellExceptionFindUniqueOrThrowArgs} args - Arguments to find a WellException
     * @example
     * // Get one WellException
     * const wellException = await prisma.wellException.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WellExceptionFindUniqueOrThrowArgs>(args: SelectSubset<T, WellExceptionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WellExceptionClient<$Result.GetResult<Prisma.$WellExceptionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WellException that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WellExceptionFindFirstArgs} args - Arguments to find a WellException
     * @example
     * // Get one WellException
     * const wellException = await prisma.wellException.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WellExceptionFindFirstArgs>(args?: SelectSubset<T, WellExceptionFindFirstArgs<ExtArgs>>): Prisma__WellExceptionClient<$Result.GetResult<Prisma.$WellExceptionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WellException that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WellExceptionFindFirstOrThrowArgs} args - Arguments to find a WellException
     * @example
     * // Get one WellException
     * const wellException = await prisma.wellException.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WellExceptionFindFirstOrThrowArgs>(args?: SelectSubset<T, WellExceptionFindFirstOrThrowArgs<ExtArgs>>): Prisma__WellExceptionClient<$Result.GetResult<Prisma.$WellExceptionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more WellExceptions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WellExceptionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WellExceptions
     * const wellExceptions = await prisma.wellException.findMany()
     * 
     * // Get first 10 WellExceptions
     * const wellExceptions = await prisma.wellException.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const wellExceptionWithIdOnly = await prisma.wellException.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WellExceptionFindManyArgs>(args?: SelectSubset<T, WellExceptionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WellExceptionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a WellException.
     * @param {WellExceptionCreateArgs} args - Arguments to create a WellException.
     * @example
     * // Create one WellException
     * const WellException = await prisma.wellException.create({
     *   data: {
     *     // ... data to create a WellException
     *   }
     * })
     * 
     */
    create<T extends WellExceptionCreateArgs>(args: SelectSubset<T, WellExceptionCreateArgs<ExtArgs>>): Prisma__WellExceptionClient<$Result.GetResult<Prisma.$WellExceptionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many WellExceptions.
     * @param {WellExceptionCreateManyArgs} args - Arguments to create many WellExceptions.
     * @example
     * // Create many WellExceptions
     * const wellException = await prisma.wellException.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WellExceptionCreateManyArgs>(args?: SelectSubset<T, WellExceptionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many WellExceptions and returns the data saved in the database.
     * @param {WellExceptionCreateManyAndReturnArgs} args - Arguments to create many WellExceptions.
     * @example
     * // Create many WellExceptions
     * const wellException = await prisma.wellException.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many WellExceptions and only return the `id`
     * const wellExceptionWithIdOnly = await prisma.wellException.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WellExceptionCreateManyAndReturnArgs>(args?: SelectSubset<T, WellExceptionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WellExceptionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a WellException.
     * @param {WellExceptionDeleteArgs} args - Arguments to delete one WellException.
     * @example
     * // Delete one WellException
     * const WellException = await prisma.wellException.delete({
     *   where: {
     *     // ... filter to delete one WellException
     *   }
     * })
     * 
     */
    delete<T extends WellExceptionDeleteArgs>(args: SelectSubset<T, WellExceptionDeleteArgs<ExtArgs>>): Prisma__WellExceptionClient<$Result.GetResult<Prisma.$WellExceptionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one WellException.
     * @param {WellExceptionUpdateArgs} args - Arguments to update one WellException.
     * @example
     * // Update one WellException
     * const wellException = await prisma.wellException.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WellExceptionUpdateArgs>(args: SelectSubset<T, WellExceptionUpdateArgs<ExtArgs>>): Prisma__WellExceptionClient<$Result.GetResult<Prisma.$WellExceptionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more WellExceptions.
     * @param {WellExceptionDeleteManyArgs} args - Arguments to filter WellExceptions to delete.
     * @example
     * // Delete a few WellExceptions
     * const { count } = await prisma.wellException.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WellExceptionDeleteManyArgs>(args?: SelectSubset<T, WellExceptionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WellExceptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WellExceptionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WellExceptions
     * const wellException = await prisma.wellException.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WellExceptionUpdateManyArgs>(args: SelectSubset<T, WellExceptionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WellExceptions and returns the data updated in the database.
     * @param {WellExceptionUpdateManyAndReturnArgs} args - Arguments to update many WellExceptions.
     * @example
     * // Update many WellExceptions
     * const wellException = await prisma.wellException.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more WellExceptions and only return the `id`
     * const wellExceptionWithIdOnly = await prisma.wellException.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends WellExceptionUpdateManyAndReturnArgs>(args: SelectSubset<T, WellExceptionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WellExceptionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one WellException.
     * @param {WellExceptionUpsertArgs} args - Arguments to update or create a WellException.
     * @example
     * // Update or create a WellException
     * const wellException = await prisma.wellException.upsert({
     *   create: {
     *     // ... data to create a WellException
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WellException we want to update
     *   }
     * })
     */
    upsert<T extends WellExceptionUpsertArgs>(args: SelectSubset<T, WellExceptionUpsertArgs<ExtArgs>>): Prisma__WellExceptionClient<$Result.GetResult<Prisma.$WellExceptionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of WellExceptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WellExceptionCountArgs} args - Arguments to filter WellExceptions to count.
     * @example
     * // Count the number of WellExceptions
     * const count = await prisma.wellException.count({
     *   where: {
     *     // ... the filter for the WellExceptions we want to count
     *   }
     * })
    **/
    count<T extends WellExceptionCountArgs>(
      args?: Subset<T, WellExceptionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WellExceptionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WellException.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WellExceptionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WellExceptionAggregateArgs>(args: Subset<T, WellExceptionAggregateArgs>): Prisma.PrismaPromise<GetWellExceptionAggregateType<T>>

    /**
     * Group by WellException.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WellExceptionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WellExceptionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WellExceptionGroupByArgs['orderBy'] }
        : { orderBy?: WellExceptionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WellExceptionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWellExceptionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WellException model
   */
  readonly fields: WellExceptionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WellException.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WellExceptionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    shipment<T extends WellShipmentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, WellShipmentDefaultArgs<ExtArgs>>): Prisma__WellShipmentClient<$Result.GetResult<Prisma.$WellShipmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the WellException model
   */
  interface WellExceptionFieldRefs {
    readonly id: FieldRef<"WellException", 'String'>
    readonly shipmentId: FieldRef<"WellException", 'String'>
    readonly containerId: FieldRef<"WellException", 'String'>
    readonly issueType: FieldRef<"WellException", 'String'>
    readonly severity: FieldRef<"WellException", 'String'>
    readonly status: FieldRef<"WellException", 'String'>
    readonly description: FieldRef<"WellException", 'String'>
    readonly expectedResolution: FieldRef<"WellException", 'String'>
    readonly assignedTo: FieldRef<"WellException", 'String'>
    readonly dueDate: FieldRef<"WellException", 'DateTime'>
    readonly createdBy: FieldRef<"WellException", 'String'>
    readonly createdAt: FieldRef<"WellException", 'DateTime'>
    readonly resolvedAt: FieldRef<"WellException", 'DateTime'>
    readonly resolvedBy: FieldRef<"WellException", 'String'>
  }
    

  // Custom InputTypes
  /**
   * WellException findUnique
   */
  export type WellExceptionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WellException
     */
    select?: WellExceptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WellException
     */
    omit?: WellExceptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WellExceptionInclude<ExtArgs> | null
    /**
     * Filter, which WellException to fetch.
     */
    where: WellExceptionWhereUniqueInput
  }

  /**
   * WellException findUniqueOrThrow
   */
  export type WellExceptionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WellException
     */
    select?: WellExceptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WellException
     */
    omit?: WellExceptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WellExceptionInclude<ExtArgs> | null
    /**
     * Filter, which WellException to fetch.
     */
    where: WellExceptionWhereUniqueInput
  }

  /**
   * WellException findFirst
   */
  export type WellExceptionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WellException
     */
    select?: WellExceptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WellException
     */
    omit?: WellExceptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WellExceptionInclude<ExtArgs> | null
    /**
     * Filter, which WellException to fetch.
     */
    where?: WellExceptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WellExceptions to fetch.
     */
    orderBy?: WellExceptionOrderByWithRelationInput | WellExceptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WellExceptions.
     */
    cursor?: WellExceptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WellExceptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WellExceptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WellExceptions.
     */
    distinct?: WellExceptionScalarFieldEnum | WellExceptionScalarFieldEnum[]
  }

  /**
   * WellException findFirstOrThrow
   */
  export type WellExceptionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WellException
     */
    select?: WellExceptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WellException
     */
    omit?: WellExceptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WellExceptionInclude<ExtArgs> | null
    /**
     * Filter, which WellException to fetch.
     */
    where?: WellExceptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WellExceptions to fetch.
     */
    orderBy?: WellExceptionOrderByWithRelationInput | WellExceptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WellExceptions.
     */
    cursor?: WellExceptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WellExceptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WellExceptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WellExceptions.
     */
    distinct?: WellExceptionScalarFieldEnum | WellExceptionScalarFieldEnum[]
  }

  /**
   * WellException findMany
   */
  export type WellExceptionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WellException
     */
    select?: WellExceptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WellException
     */
    omit?: WellExceptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WellExceptionInclude<ExtArgs> | null
    /**
     * Filter, which WellExceptions to fetch.
     */
    where?: WellExceptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WellExceptions to fetch.
     */
    orderBy?: WellExceptionOrderByWithRelationInput | WellExceptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WellExceptions.
     */
    cursor?: WellExceptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WellExceptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WellExceptions.
     */
    skip?: number
    distinct?: WellExceptionScalarFieldEnum | WellExceptionScalarFieldEnum[]
  }

  /**
   * WellException create
   */
  export type WellExceptionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WellException
     */
    select?: WellExceptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WellException
     */
    omit?: WellExceptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WellExceptionInclude<ExtArgs> | null
    /**
     * The data needed to create a WellException.
     */
    data: XOR<WellExceptionCreateInput, WellExceptionUncheckedCreateInput>
  }

  /**
   * WellException createMany
   */
  export type WellExceptionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many WellExceptions.
     */
    data: WellExceptionCreateManyInput | WellExceptionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WellException createManyAndReturn
   */
  export type WellExceptionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WellException
     */
    select?: WellExceptionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WellException
     */
    omit?: WellExceptionOmit<ExtArgs> | null
    /**
     * The data used to create many WellExceptions.
     */
    data: WellExceptionCreateManyInput | WellExceptionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WellExceptionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * WellException update
   */
  export type WellExceptionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WellException
     */
    select?: WellExceptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WellException
     */
    omit?: WellExceptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WellExceptionInclude<ExtArgs> | null
    /**
     * The data needed to update a WellException.
     */
    data: XOR<WellExceptionUpdateInput, WellExceptionUncheckedUpdateInput>
    /**
     * Choose, which WellException to update.
     */
    where: WellExceptionWhereUniqueInput
  }

  /**
   * WellException updateMany
   */
  export type WellExceptionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WellExceptions.
     */
    data: XOR<WellExceptionUpdateManyMutationInput, WellExceptionUncheckedUpdateManyInput>
    /**
     * Filter which WellExceptions to update
     */
    where?: WellExceptionWhereInput
    /**
     * Limit how many WellExceptions to update.
     */
    limit?: number
  }

  /**
   * WellException updateManyAndReturn
   */
  export type WellExceptionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WellException
     */
    select?: WellExceptionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WellException
     */
    omit?: WellExceptionOmit<ExtArgs> | null
    /**
     * The data used to update WellExceptions.
     */
    data: XOR<WellExceptionUpdateManyMutationInput, WellExceptionUncheckedUpdateManyInput>
    /**
     * Filter which WellExceptions to update
     */
    where?: WellExceptionWhereInput
    /**
     * Limit how many WellExceptions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WellExceptionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * WellException upsert
   */
  export type WellExceptionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WellException
     */
    select?: WellExceptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WellException
     */
    omit?: WellExceptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WellExceptionInclude<ExtArgs> | null
    /**
     * The filter to search for the WellException to update in case it exists.
     */
    where: WellExceptionWhereUniqueInput
    /**
     * In case the WellException found by the `where` argument doesn't exist, create a new WellException with this data.
     */
    create: XOR<WellExceptionCreateInput, WellExceptionUncheckedCreateInput>
    /**
     * In case the WellException was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WellExceptionUpdateInput, WellExceptionUncheckedUpdateInput>
  }

  /**
   * WellException delete
   */
  export type WellExceptionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WellException
     */
    select?: WellExceptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WellException
     */
    omit?: WellExceptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WellExceptionInclude<ExtArgs> | null
    /**
     * Filter which WellException to delete.
     */
    where: WellExceptionWhereUniqueInput
  }

  /**
   * WellException deleteMany
   */
  export type WellExceptionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WellExceptions to delete
     */
    where?: WellExceptionWhereInput
    /**
     * Limit how many WellExceptions to delete.
     */
    limit?: number
  }

  /**
   * WellException without action
   */
  export type WellExceptionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WellException
     */
    select?: WellExceptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WellException
     */
    omit?: WellExceptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WellExceptionInclude<ExtArgs> | null
  }


  /**
   * Model WellContainer
   */

  export type AggregateWellContainer = {
    _count: WellContainerCountAggregateOutputType | null
    _avg: WellContainerAvgAggregateOutputType | null
    _sum: WellContainerSumAggregateOutputType | null
    _min: WellContainerMinAggregateOutputType | null
    _max: WellContainerMaxAggregateOutputType | null
  }

  export type WellContainerAvgAggregateOutputType = {
    weight: number | null
  }

  export type WellContainerSumAggregateOutputType = {
    weight: number | null
  }

  export type WellContainerMinAggregateOutputType = {
    id: string | null
    shipmentId: string | null
    containerNumber: string | null
    size: string | null
    weight: number | null
    dischargeDate: Date | null
    gateOutDate: Date | null
    truckDetails: string | null
    driverName: string | null
    status: string | null
    remarks: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type WellContainerMaxAggregateOutputType = {
    id: string | null
    shipmentId: string | null
    containerNumber: string | null
    size: string | null
    weight: number | null
    dischargeDate: Date | null
    gateOutDate: Date | null
    truckDetails: string | null
    driverName: string | null
    status: string | null
    remarks: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type WellContainerCountAggregateOutputType = {
    id: number
    shipmentId: number
    containerNumber: number
    size: number
    weight: number
    dischargeDate: number
    gateOutDate: number
    truckDetails: number
    driverName: number
    status: number
    remarks: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type WellContainerAvgAggregateInputType = {
    weight?: true
  }

  export type WellContainerSumAggregateInputType = {
    weight?: true
  }

  export type WellContainerMinAggregateInputType = {
    id?: true
    shipmentId?: true
    containerNumber?: true
    size?: true
    weight?: true
    dischargeDate?: true
    gateOutDate?: true
    truckDetails?: true
    driverName?: true
    status?: true
    remarks?: true
    createdAt?: true
    updatedAt?: true
  }

  export type WellContainerMaxAggregateInputType = {
    id?: true
    shipmentId?: true
    containerNumber?: true
    size?: true
    weight?: true
    dischargeDate?: true
    gateOutDate?: true
    truckDetails?: true
    driverName?: true
    status?: true
    remarks?: true
    createdAt?: true
    updatedAt?: true
  }

  export type WellContainerCountAggregateInputType = {
    id?: true
    shipmentId?: true
    containerNumber?: true
    size?: true
    weight?: true
    dischargeDate?: true
    gateOutDate?: true
    truckDetails?: true
    driverName?: true
    status?: true
    remarks?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type WellContainerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WellContainer to aggregate.
     */
    where?: WellContainerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WellContainers to fetch.
     */
    orderBy?: WellContainerOrderByWithRelationInput | WellContainerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WellContainerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WellContainers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WellContainers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WellContainers
    **/
    _count?: true | WellContainerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: WellContainerAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: WellContainerSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WellContainerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WellContainerMaxAggregateInputType
  }

  export type GetWellContainerAggregateType<T extends WellContainerAggregateArgs> = {
        [P in keyof T & keyof AggregateWellContainer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWellContainer[P]>
      : GetScalarType<T[P], AggregateWellContainer[P]>
  }




  export type WellContainerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WellContainerWhereInput
    orderBy?: WellContainerOrderByWithAggregationInput | WellContainerOrderByWithAggregationInput[]
    by: WellContainerScalarFieldEnum[] | WellContainerScalarFieldEnum
    having?: WellContainerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WellContainerCountAggregateInputType | true
    _avg?: WellContainerAvgAggregateInputType
    _sum?: WellContainerSumAggregateInputType
    _min?: WellContainerMinAggregateInputType
    _max?: WellContainerMaxAggregateInputType
  }

  export type WellContainerGroupByOutputType = {
    id: string
    shipmentId: string
    containerNumber: string
    size: string | null
    weight: number | null
    dischargeDate: Date | null
    gateOutDate: Date | null
    truckDetails: string | null
    driverName: string | null
    status: string | null
    remarks: string | null
    createdAt: Date
    updatedAt: Date
    _count: WellContainerCountAggregateOutputType | null
    _avg: WellContainerAvgAggregateOutputType | null
    _sum: WellContainerSumAggregateOutputType | null
    _min: WellContainerMinAggregateOutputType | null
    _max: WellContainerMaxAggregateOutputType | null
  }

  type GetWellContainerGroupByPayload<T extends WellContainerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WellContainerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WellContainerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WellContainerGroupByOutputType[P]>
            : GetScalarType<T[P], WellContainerGroupByOutputType[P]>
        }
      >
    >


  export type WellContainerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    shipmentId?: boolean
    containerNumber?: boolean
    size?: boolean
    weight?: boolean
    dischargeDate?: boolean
    gateOutDate?: boolean
    truckDetails?: boolean
    driverName?: boolean
    status?: boolean
    remarks?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    shipment?: boolean | WellShipmentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["wellContainer"]>

  export type WellContainerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    shipmentId?: boolean
    containerNumber?: boolean
    size?: boolean
    weight?: boolean
    dischargeDate?: boolean
    gateOutDate?: boolean
    truckDetails?: boolean
    driverName?: boolean
    status?: boolean
    remarks?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    shipment?: boolean | WellShipmentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["wellContainer"]>

  export type WellContainerSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    shipmentId?: boolean
    containerNumber?: boolean
    size?: boolean
    weight?: boolean
    dischargeDate?: boolean
    gateOutDate?: boolean
    truckDetails?: boolean
    driverName?: boolean
    status?: boolean
    remarks?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    shipment?: boolean | WellShipmentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["wellContainer"]>

  export type WellContainerSelectScalar = {
    id?: boolean
    shipmentId?: boolean
    containerNumber?: boolean
    size?: boolean
    weight?: boolean
    dischargeDate?: boolean
    gateOutDate?: boolean
    truckDetails?: boolean
    driverName?: boolean
    status?: boolean
    remarks?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type WellContainerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "shipmentId" | "containerNumber" | "size" | "weight" | "dischargeDate" | "gateOutDate" | "truckDetails" | "driverName" | "status" | "remarks" | "createdAt" | "updatedAt", ExtArgs["result"]["wellContainer"]>
  export type WellContainerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    shipment?: boolean | WellShipmentDefaultArgs<ExtArgs>
  }
  export type WellContainerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    shipment?: boolean | WellShipmentDefaultArgs<ExtArgs>
  }
  export type WellContainerIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    shipment?: boolean | WellShipmentDefaultArgs<ExtArgs>
  }

  export type $WellContainerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WellContainer"
    objects: {
      shipment: Prisma.$WellShipmentPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      shipmentId: string
      containerNumber: string
      size: string | null
      weight: number | null
      dischargeDate: Date | null
      gateOutDate: Date | null
      truckDetails: string | null
      driverName: string | null
      status: string | null
      remarks: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["wellContainer"]>
    composites: {}
  }

  type WellContainerGetPayload<S extends boolean | null | undefined | WellContainerDefaultArgs> = $Result.GetResult<Prisma.$WellContainerPayload, S>

  type WellContainerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WellContainerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WellContainerCountAggregateInputType | true
    }

  export interface WellContainerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WellContainer'], meta: { name: 'WellContainer' } }
    /**
     * Find zero or one WellContainer that matches the filter.
     * @param {WellContainerFindUniqueArgs} args - Arguments to find a WellContainer
     * @example
     * // Get one WellContainer
     * const wellContainer = await prisma.wellContainer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WellContainerFindUniqueArgs>(args: SelectSubset<T, WellContainerFindUniqueArgs<ExtArgs>>): Prisma__WellContainerClient<$Result.GetResult<Prisma.$WellContainerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one WellContainer that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WellContainerFindUniqueOrThrowArgs} args - Arguments to find a WellContainer
     * @example
     * // Get one WellContainer
     * const wellContainer = await prisma.wellContainer.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WellContainerFindUniqueOrThrowArgs>(args: SelectSubset<T, WellContainerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WellContainerClient<$Result.GetResult<Prisma.$WellContainerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WellContainer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WellContainerFindFirstArgs} args - Arguments to find a WellContainer
     * @example
     * // Get one WellContainer
     * const wellContainer = await prisma.wellContainer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WellContainerFindFirstArgs>(args?: SelectSubset<T, WellContainerFindFirstArgs<ExtArgs>>): Prisma__WellContainerClient<$Result.GetResult<Prisma.$WellContainerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WellContainer that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WellContainerFindFirstOrThrowArgs} args - Arguments to find a WellContainer
     * @example
     * // Get one WellContainer
     * const wellContainer = await prisma.wellContainer.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WellContainerFindFirstOrThrowArgs>(args?: SelectSubset<T, WellContainerFindFirstOrThrowArgs<ExtArgs>>): Prisma__WellContainerClient<$Result.GetResult<Prisma.$WellContainerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more WellContainers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WellContainerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WellContainers
     * const wellContainers = await prisma.wellContainer.findMany()
     * 
     * // Get first 10 WellContainers
     * const wellContainers = await prisma.wellContainer.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const wellContainerWithIdOnly = await prisma.wellContainer.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WellContainerFindManyArgs>(args?: SelectSubset<T, WellContainerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WellContainerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a WellContainer.
     * @param {WellContainerCreateArgs} args - Arguments to create a WellContainer.
     * @example
     * // Create one WellContainer
     * const WellContainer = await prisma.wellContainer.create({
     *   data: {
     *     // ... data to create a WellContainer
     *   }
     * })
     * 
     */
    create<T extends WellContainerCreateArgs>(args: SelectSubset<T, WellContainerCreateArgs<ExtArgs>>): Prisma__WellContainerClient<$Result.GetResult<Prisma.$WellContainerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many WellContainers.
     * @param {WellContainerCreateManyArgs} args - Arguments to create many WellContainers.
     * @example
     * // Create many WellContainers
     * const wellContainer = await prisma.wellContainer.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WellContainerCreateManyArgs>(args?: SelectSubset<T, WellContainerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many WellContainers and returns the data saved in the database.
     * @param {WellContainerCreateManyAndReturnArgs} args - Arguments to create many WellContainers.
     * @example
     * // Create many WellContainers
     * const wellContainer = await prisma.wellContainer.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many WellContainers and only return the `id`
     * const wellContainerWithIdOnly = await prisma.wellContainer.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WellContainerCreateManyAndReturnArgs>(args?: SelectSubset<T, WellContainerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WellContainerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a WellContainer.
     * @param {WellContainerDeleteArgs} args - Arguments to delete one WellContainer.
     * @example
     * // Delete one WellContainer
     * const WellContainer = await prisma.wellContainer.delete({
     *   where: {
     *     // ... filter to delete one WellContainer
     *   }
     * })
     * 
     */
    delete<T extends WellContainerDeleteArgs>(args: SelectSubset<T, WellContainerDeleteArgs<ExtArgs>>): Prisma__WellContainerClient<$Result.GetResult<Prisma.$WellContainerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one WellContainer.
     * @param {WellContainerUpdateArgs} args - Arguments to update one WellContainer.
     * @example
     * // Update one WellContainer
     * const wellContainer = await prisma.wellContainer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WellContainerUpdateArgs>(args: SelectSubset<T, WellContainerUpdateArgs<ExtArgs>>): Prisma__WellContainerClient<$Result.GetResult<Prisma.$WellContainerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more WellContainers.
     * @param {WellContainerDeleteManyArgs} args - Arguments to filter WellContainers to delete.
     * @example
     * // Delete a few WellContainers
     * const { count } = await prisma.wellContainer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WellContainerDeleteManyArgs>(args?: SelectSubset<T, WellContainerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WellContainers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WellContainerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WellContainers
     * const wellContainer = await prisma.wellContainer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WellContainerUpdateManyArgs>(args: SelectSubset<T, WellContainerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WellContainers and returns the data updated in the database.
     * @param {WellContainerUpdateManyAndReturnArgs} args - Arguments to update many WellContainers.
     * @example
     * // Update many WellContainers
     * const wellContainer = await prisma.wellContainer.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more WellContainers and only return the `id`
     * const wellContainerWithIdOnly = await prisma.wellContainer.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends WellContainerUpdateManyAndReturnArgs>(args: SelectSubset<T, WellContainerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WellContainerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one WellContainer.
     * @param {WellContainerUpsertArgs} args - Arguments to update or create a WellContainer.
     * @example
     * // Update or create a WellContainer
     * const wellContainer = await prisma.wellContainer.upsert({
     *   create: {
     *     // ... data to create a WellContainer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WellContainer we want to update
     *   }
     * })
     */
    upsert<T extends WellContainerUpsertArgs>(args: SelectSubset<T, WellContainerUpsertArgs<ExtArgs>>): Prisma__WellContainerClient<$Result.GetResult<Prisma.$WellContainerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of WellContainers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WellContainerCountArgs} args - Arguments to filter WellContainers to count.
     * @example
     * // Count the number of WellContainers
     * const count = await prisma.wellContainer.count({
     *   where: {
     *     // ... the filter for the WellContainers we want to count
     *   }
     * })
    **/
    count<T extends WellContainerCountArgs>(
      args?: Subset<T, WellContainerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WellContainerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WellContainer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WellContainerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WellContainerAggregateArgs>(args: Subset<T, WellContainerAggregateArgs>): Prisma.PrismaPromise<GetWellContainerAggregateType<T>>

    /**
     * Group by WellContainer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WellContainerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WellContainerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WellContainerGroupByArgs['orderBy'] }
        : { orderBy?: WellContainerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WellContainerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWellContainerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WellContainer model
   */
  readonly fields: WellContainerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WellContainer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WellContainerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    shipment<T extends WellShipmentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, WellShipmentDefaultArgs<ExtArgs>>): Prisma__WellShipmentClient<$Result.GetResult<Prisma.$WellShipmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the WellContainer model
   */
  interface WellContainerFieldRefs {
    readonly id: FieldRef<"WellContainer", 'String'>
    readonly shipmentId: FieldRef<"WellContainer", 'String'>
    readonly containerNumber: FieldRef<"WellContainer", 'String'>
    readonly size: FieldRef<"WellContainer", 'String'>
    readonly weight: FieldRef<"WellContainer", 'Float'>
    readonly dischargeDate: FieldRef<"WellContainer", 'DateTime'>
    readonly gateOutDate: FieldRef<"WellContainer", 'DateTime'>
    readonly truckDetails: FieldRef<"WellContainer", 'String'>
    readonly driverName: FieldRef<"WellContainer", 'String'>
    readonly status: FieldRef<"WellContainer", 'String'>
    readonly remarks: FieldRef<"WellContainer", 'String'>
    readonly createdAt: FieldRef<"WellContainer", 'DateTime'>
    readonly updatedAt: FieldRef<"WellContainer", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * WellContainer findUnique
   */
  export type WellContainerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WellContainer
     */
    select?: WellContainerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WellContainer
     */
    omit?: WellContainerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WellContainerInclude<ExtArgs> | null
    /**
     * Filter, which WellContainer to fetch.
     */
    where: WellContainerWhereUniqueInput
  }

  /**
   * WellContainer findUniqueOrThrow
   */
  export type WellContainerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WellContainer
     */
    select?: WellContainerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WellContainer
     */
    omit?: WellContainerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WellContainerInclude<ExtArgs> | null
    /**
     * Filter, which WellContainer to fetch.
     */
    where: WellContainerWhereUniqueInput
  }

  /**
   * WellContainer findFirst
   */
  export type WellContainerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WellContainer
     */
    select?: WellContainerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WellContainer
     */
    omit?: WellContainerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WellContainerInclude<ExtArgs> | null
    /**
     * Filter, which WellContainer to fetch.
     */
    where?: WellContainerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WellContainers to fetch.
     */
    orderBy?: WellContainerOrderByWithRelationInput | WellContainerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WellContainers.
     */
    cursor?: WellContainerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WellContainers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WellContainers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WellContainers.
     */
    distinct?: WellContainerScalarFieldEnum | WellContainerScalarFieldEnum[]
  }

  /**
   * WellContainer findFirstOrThrow
   */
  export type WellContainerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WellContainer
     */
    select?: WellContainerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WellContainer
     */
    omit?: WellContainerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WellContainerInclude<ExtArgs> | null
    /**
     * Filter, which WellContainer to fetch.
     */
    where?: WellContainerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WellContainers to fetch.
     */
    orderBy?: WellContainerOrderByWithRelationInput | WellContainerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WellContainers.
     */
    cursor?: WellContainerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WellContainers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WellContainers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WellContainers.
     */
    distinct?: WellContainerScalarFieldEnum | WellContainerScalarFieldEnum[]
  }

  /**
   * WellContainer findMany
   */
  export type WellContainerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WellContainer
     */
    select?: WellContainerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WellContainer
     */
    omit?: WellContainerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WellContainerInclude<ExtArgs> | null
    /**
     * Filter, which WellContainers to fetch.
     */
    where?: WellContainerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WellContainers to fetch.
     */
    orderBy?: WellContainerOrderByWithRelationInput | WellContainerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WellContainers.
     */
    cursor?: WellContainerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WellContainers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WellContainers.
     */
    skip?: number
    distinct?: WellContainerScalarFieldEnum | WellContainerScalarFieldEnum[]
  }

  /**
   * WellContainer create
   */
  export type WellContainerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WellContainer
     */
    select?: WellContainerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WellContainer
     */
    omit?: WellContainerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WellContainerInclude<ExtArgs> | null
    /**
     * The data needed to create a WellContainer.
     */
    data: XOR<WellContainerCreateInput, WellContainerUncheckedCreateInput>
  }

  /**
   * WellContainer createMany
   */
  export type WellContainerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many WellContainers.
     */
    data: WellContainerCreateManyInput | WellContainerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WellContainer createManyAndReturn
   */
  export type WellContainerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WellContainer
     */
    select?: WellContainerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WellContainer
     */
    omit?: WellContainerOmit<ExtArgs> | null
    /**
     * The data used to create many WellContainers.
     */
    data: WellContainerCreateManyInput | WellContainerCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WellContainerIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * WellContainer update
   */
  export type WellContainerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WellContainer
     */
    select?: WellContainerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WellContainer
     */
    omit?: WellContainerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WellContainerInclude<ExtArgs> | null
    /**
     * The data needed to update a WellContainer.
     */
    data: XOR<WellContainerUpdateInput, WellContainerUncheckedUpdateInput>
    /**
     * Choose, which WellContainer to update.
     */
    where: WellContainerWhereUniqueInput
  }

  /**
   * WellContainer updateMany
   */
  export type WellContainerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WellContainers.
     */
    data: XOR<WellContainerUpdateManyMutationInput, WellContainerUncheckedUpdateManyInput>
    /**
     * Filter which WellContainers to update
     */
    where?: WellContainerWhereInput
    /**
     * Limit how many WellContainers to update.
     */
    limit?: number
  }

  /**
   * WellContainer updateManyAndReturn
   */
  export type WellContainerUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WellContainer
     */
    select?: WellContainerSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WellContainer
     */
    omit?: WellContainerOmit<ExtArgs> | null
    /**
     * The data used to update WellContainers.
     */
    data: XOR<WellContainerUpdateManyMutationInput, WellContainerUncheckedUpdateManyInput>
    /**
     * Filter which WellContainers to update
     */
    where?: WellContainerWhereInput
    /**
     * Limit how many WellContainers to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WellContainerIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * WellContainer upsert
   */
  export type WellContainerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WellContainer
     */
    select?: WellContainerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WellContainer
     */
    omit?: WellContainerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WellContainerInclude<ExtArgs> | null
    /**
     * The filter to search for the WellContainer to update in case it exists.
     */
    where: WellContainerWhereUniqueInput
    /**
     * In case the WellContainer found by the `where` argument doesn't exist, create a new WellContainer with this data.
     */
    create: XOR<WellContainerCreateInput, WellContainerUncheckedCreateInput>
    /**
     * In case the WellContainer was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WellContainerUpdateInput, WellContainerUncheckedUpdateInput>
  }

  /**
   * WellContainer delete
   */
  export type WellContainerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WellContainer
     */
    select?: WellContainerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WellContainer
     */
    omit?: WellContainerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WellContainerInclude<ExtArgs> | null
    /**
     * Filter which WellContainer to delete.
     */
    where: WellContainerWhereUniqueInput
  }

  /**
   * WellContainer deleteMany
   */
  export type WellContainerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WellContainers to delete
     */
    where?: WellContainerWhereInput
    /**
     * Limit how many WellContainers to delete.
     */
    limit?: number
  }

  /**
   * WellContainer without action
   */
  export type WellContainerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WellContainer
     */
    select?: WellContainerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WellContainer
     */
    omit?: WellContainerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WellContainerInclude<ExtArgs> | null
  }


  /**
   * Model WellDocument
   */

  export type AggregateWellDocument = {
    _count: WellDocumentCountAggregateOutputType | null
    _min: WellDocumentMinAggregateOutputType | null
    _max: WellDocumentMaxAggregateOutputType | null
  }

  export type WellDocumentMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    shipmentId: string | null
    filename: string | null
    driveFileId: string | null
    driveUrl: string | null
    docType: string | null
  }

  export type WellDocumentMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    shipmentId: string | null
    filename: string | null
    driveFileId: string | null
    driveUrl: string | null
    docType: string | null
  }

  export type WellDocumentCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    shipmentId: number
    filename: number
    driveFileId: number
    driveUrl: number
    docType: number
    _all: number
  }


  export type WellDocumentMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    shipmentId?: true
    filename?: true
    driveFileId?: true
    driveUrl?: true
    docType?: true
  }

  export type WellDocumentMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    shipmentId?: true
    filename?: true
    driveFileId?: true
    driveUrl?: true
    docType?: true
  }

  export type WellDocumentCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    shipmentId?: true
    filename?: true
    driveFileId?: true
    driveUrl?: true
    docType?: true
    _all?: true
  }

  export type WellDocumentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WellDocument to aggregate.
     */
    where?: WellDocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WellDocuments to fetch.
     */
    orderBy?: WellDocumentOrderByWithRelationInput | WellDocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WellDocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WellDocuments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WellDocuments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WellDocuments
    **/
    _count?: true | WellDocumentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WellDocumentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WellDocumentMaxAggregateInputType
  }

  export type GetWellDocumentAggregateType<T extends WellDocumentAggregateArgs> = {
        [P in keyof T & keyof AggregateWellDocument]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWellDocument[P]>
      : GetScalarType<T[P], AggregateWellDocument[P]>
  }




  export type WellDocumentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WellDocumentWhereInput
    orderBy?: WellDocumentOrderByWithAggregationInput | WellDocumentOrderByWithAggregationInput[]
    by: WellDocumentScalarFieldEnum[] | WellDocumentScalarFieldEnum
    having?: WellDocumentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WellDocumentCountAggregateInputType | true
    _min?: WellDocumentMinAggregateInputType
    _max?: WellDocumentMaxAggregateInputType
  }

  export type WellDocumentGroupByOutputType = {
    id: string
    createdAt: Date
    updatedAt: Date
    shipmentId: string
    filename: string
    driveFileId: string
    driveUrl: string
    docType: string
    _count: WellDocumentCountAggregateOutputType | null
    _min: WellDocumentMinAggregateOutputType | null
    _max: WellDocumentMaxAggregateOutputType | null
  }

  type GetWellDocumentGroupByPayload<T extends WellDocumentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WellDocumentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WellDocumentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WellDocumentGroupByOutputType[P]>
            : GetScalarType<T[P], WellDocumentGroupByOutputType[P]>
        }
      >
    >


  export type WellDocumentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    shipmentId?: boolean
    filename?: boolean
    driveFileId?: boolean
    driveUrl?: boolean
    docType?: boolean
    shipment?: boolean | WellShipmentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["wellDocument"]>

  export type WellDocumentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    shipmentId?: boolean
    filename?: boolean
    driveFileId?: boolean
    driveUrl?: boolean
    docType?: boolean
    shipment?: boolean | WellShipmentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["wellDocument"]>

  export type WellDocumentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    shipmentId?: boolean
    filename?: boolean
    driveFileId?: boolean
    driveUrl?: boolean
    docType?: boolean
    shipment?: boolean | WellShipmentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["wellDocument"]>

  export type WellDocumentSelectScalar = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    shipmentId?: boolean
    filename?: boolean
    driveFileId?: boolean
    driveUrl?: boolean
    docType?: boolean
  }

  export type WellDocumentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "updatedAt" | "shipmentId" | "filename" | "driveFileId" | "driveUrl" | "docType", ExtArgs["result"]["wellDocument"]>
  export type WellDocumentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    shipment?: boolean | WellShipmentDefaultArgs<ExtArgs>
  }
  export type WellDocumentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    shipment?: boolean | WellShipmentDefaultArgs<ExtArgs>
  }
  export type WellDocumentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    shipment?: boolean | WellShipmentDefaultArgs<ExtArgs>
  }

  export type $WellDocumentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WellDocument"
    objects: {
      shipment: Prisma.$WellShipmentPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      updatedAt: Date
      shipmentId: string
      filename: string
      driveFileId: string
      driveUrl: string
      docType: string
    }, ExtArgs["result"]["wellDocument"]>
    composites: {}
  }

  type WellDocumentGetPayload<S extends boolean | null | undefined | WellDocumentDefaultArgs> = $Result.GetResult<Prisma.$WellDocumentPayload, S>

  type WellDocumentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WellDocumentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WellDocumentCountAggregateInputType | true
    }

  export interface WellDocumentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WellDocument'], meta: { name: 'WellDocument' } }
    /**
     * Find zero or one WellDocument that matches the filter.
     * @param {WellDocumentFindUniqueArgs} args - Arguments to find a WellDocument
     * @example
     * // Get one WellDocument
     * const wellDocument = await prisma.wellDocument.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WellDocumentFindUniqueArgs>(args: SelectSubset<T, WellDocumentFindUniqueArgs<ExtArgs>>): Prisma__WellDocumentClient<$Result.GetResult<Prisma.$WellDocumentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one WellDocument that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WellDocumentFindUniqueOrThrowArgs} args - Arguments to find a WellDocument
     * @example
     * // Get one WellDocument
     * const wellDocument = await prisma.wellDocument.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WellDocumentFindUniqueOrThrowArgs>(args: SelectSubset<T, WellDocumentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WellDocumentClient<$Result.GetResult<Prisma.$WellDocumentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WellDocument that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WellDocumentFindFirstArgs} args - Arguments to find a WellDocument
     * @example
     * // Get one WellDocument
     * const wellDocument = await prisma.wellDocument.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WellDocumentFindFirstArgs>(args?: SelectSubset<T, WellDocumentFindFirstArgs<ExtArgs>>): Prisma__WellDocumentClient<$Result.GetResult<Prisma.$WellDocumentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WellDocument that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WellDocumentFindFirstOrThrowArgs} args - Arguments to find a WellDocument
     * @example
     * // Get one WellDocument
     * const wellDocument = await prisma.wellDocument.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WellDocumentFindFirstOrThrowArgs>(args?: SelectSubset<T, WellDocumentFindFirstOrThrowArgs<ExtArgs>>): Prisma__WellDocumentClient<$Result.GetResult<Prisma.$WellDocumentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more WellDocuments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WellDocumentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WellDocuments
     * const wellDocuments = await prisma.wellDocument.findMany()
     * 
     * // Get first 10 WellDocuments
     * const wellDocuments = await prisma.wellDocument.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const wellDocumentWithIdOnly = await prisma.wellDocument.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WellDocumentFindManyArgs>(args?: SelectSubset<T, WellDocumentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WellDocumentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a WellDocument.
     * @param {WellDocumentCreateArgs} args - Arguments to create a WellDocument.
     * @example
     * // Create one WellDocument
     * const WellDocument = await prisma.wellDocument.create({
     *   data: {
     *     // ... data to create a WellDocument
     *   }
     * })
     * 
     */
    create<T extends WellDocumentCreateArgs>(args: SelectSubset<T, WellDocumentCreateArgs<ExtArgs>>): Prisma__WellDocumentClient<$Result.GetResult<Prisma.$WellDocumentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many WellDocuments.
     * @param {WellDocumentCreateManyArgs} args - Arguments to create many WellDocuments.
     * @example
     * // Create many WellDocuments
     * const wellDocument = await prisma.wellDocument.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WellDocumentCreateManyArgs>(args?: SelectSubset<T, WellDocumentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many WellDocuments and returns the data saved in the database.
     * @param {WellDocumentCreateManyAndReturnArgs} args - Arguments to create many WellDocuments.
     * @example
     * // Create many WellDocuments
     * const wellDocument = await prisma.wellDocument.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many WellDocuments and only return the `id`
     * const wellDocumentWithIdOnly = await prisma.wellDocument.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WellDocumentCreateManyAndReturnArgs>(args?: SelectSubset<T, WellDocumentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WellDocumentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a WellDocument.
     * @param {WellDocumentDeleteArgs} args - Arguments to delete one WellDocument.
     * @example
     * // Delete one WellDocument
     * const WellDocument = await prisma.wellDocument.delete({
     *   where: {
     *     // ... filter to delete one WellDocument
     *   }
     * })
     * 
     */
    delete<T extends WellDocumentDeleteArgs>(args: SelectSubset<T, WellDocumentDeleteArgs<ExtArgs>>): Prisma__WellDocumentClient<$Result.GetResult<Prisma.$WellDocumentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one WellDocument.
     * @param {WellDocumentUpdateArgs} args - Arguments to update one WellDocument.
     * @example
     * // Update one WellDocument
     * const wellDocument = await prisma.wellDocument.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WellDocumentUpdateArgs>(args: SelectSubset<T, WellDocumentUpdateArgs<ExtArgs>>): Prisma__WellDocumentClient<$Result.GetResult<Prisma.$WellDocumentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more WellDocuments.
     * @param {WellDocumentDeleteManyArgs} args - Arguments to filter WellDocuments to delete.
     * @example
     * // Delete a few WellDocuments
     * const { count } = await prisma.wellDocument.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WellDocumentDeleteManyArgs>(args?: SelectSubset<T, WellDocumentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WellDocuments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WellDocumentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WellDocuments
     * const wellDocument = await prisma.wellDocument.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WellDocumentUpdateManyArgs>(args: SelectSubset<T, WellDocumentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WellDocuments and returns the data updated in the database.
     * @param {WellDocumentUpdateManyAndReturnArgs} args - Arguments to update many WellDocuments.
     * @example
     * // Update many WellDocuments
     * const wellDocument = await prisma.wellDocument.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more WellDocuments and only return the `id`
     * const wellDocumentWithIdOnly = await prisma.wellDocument.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends WellDocumentUpdateManyAndReturnArgs>(args: SelectSubset<T, WellDocumentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WellDocumentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one WellDocument.
     * @param {WellDocumentUpsertArgs} args - Arguments to update or create a WellDocument.
     * @example
     * // Update or create a WellDocument
     * const wellDocument = await prisma.wellDocument.upsert({
     *   create: {
     *     // ... data to create a WellDocument
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WellDocument we want to update
     *   }
     * })
     */
    upsert<T extends WellDocumentUpsertArgs>(args: SelectSubset<T, WellDocumentUpsertArgs<ExtArgs>>): Prisma__WellDocumentClient<$Result.GetResult<Prisma.$WellDocumentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of WellDocuments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WellDocumentCountArgs} args - Arguments to filter WellDocuments to count.
     * @example
     * // Count the number of WellDocuments
     * const count = await prisma.wellDocument.count({
     *   where: {
     *     // ... the filter for the WellDocuments we want to count
     *   }
     * })
    **/
    count<T extends WellDocumentCountArgs>(
      args?: Subset<T, WellDocumentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WellDocumentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WellDocument.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WellDocumentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WellDocumentAggregateArgs>(args: Subset<T, WellDocumentAggregateArgs>): Prisma.PrismaPromise<GetWellDocumentAggregateType<T>>

    /**
     * Group by WellDocument.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WellDocumentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WellDocumentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WellDocumentGroupByArgs['orderBy'] }
        : { orderBy?: WellDocumentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WellDocumentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWellDocumentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WellDocument model
   */
  readonly fields: WellDocumentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WellDocument.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WellDocumentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    shipment<T extends WellShipmentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, WellShipmentDefaultArgs<ExtArgs>>): Prisma__WellShipmentClient<$Result.GetResult<Prisma.$WellShipmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the WellDocument model
   */
  interface WellDocumentFieldRefs {
    readonly id: FieldRef<"WellDocument", 'String'>
    readonly createdAt: FieldRef<"WellDocument", 'DateTime'>
    readonly updatedAt: FieldRef<"WellDocument", 'DateTime'>
    readonly shipmentId: FieldRef<"WellDocument", 'String'>
    readonly filename: FieldRef<"WellDocument", 'String'>
    readonly driveFileId: FieldRef<"WellDocument", 'String'>
    readonly driveUrl: FieldRef<"WellDocument", 'String'>
    readonly docType: FieldRef<"WellDocument", 'String'>
  }
    

  // Custom InputTypes
  /**
   * WellDocument findUnique
   */
  export type WellDocumentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WellDocument
     */
    select?: WellDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WellDocument
     */
    omit?: WellDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WellDocumentInclude<ExtArgs> | null
    /**
     * Filter, which WellDocument to fetch.
     */
    where: WellDocumentWhereUniqueInput
  }

  /**
   * WellDocument findUniqueOrThrow
   */
  export type WellDocumentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WellDocument
     */
    select?: WellDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WellDocument
     */
    omit?: WellDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WellDocumentInclude<ExtArgs> | null
    /**
     * Filter, which WellDocument to fetch.
     */
    where: WellDocumentWhereUniqueInput
  }

  /**
   * WellDocument findFirst
   */
  export type WellDocumentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WellDocument
     */
    select?: WellDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WellDocument
     */
    omit?: WellDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WellDocumentInclude<ExtArgs> | null
    /**
     * Filter, which WellDocument to fetch.
     */
    where?: WellDocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WellDocuments to fetch.
     */
    orderBy?: WellDocumentOrderByWithRelationInput | WellDocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WellDocuments.
     */
    cursor?: WellDocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WellDocuments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WellDocuments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WellDocuments.
     */
    distinct?: WellDocumentScalarFieldEnum | WellDocumentScalarFieldEnum[]
  }

  /**
   * WellDocument findFirstOrThrow
   */
  export type WellDocumentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WellDocument
     */
    select?: WellDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WellDocument
     */
    omit?: WellDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WellDocumentInclude<ExtArgs> | null
    /**
     * Filter, which WellDocument to fetch.
     */
    where?: WellDocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WellDocuments to fetch.
     */
    orderBy?: WellDocumentOrderByWithRelationInput | WellDocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WellDocuments.
     */
    cursor?: WellDocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WellDocuments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WellDocuments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WellDocuments.
     */
    distinct?: WellDocumentScalarFieldEnum | WellDocumentScalarFieldEnum[]
  }

  /**
   * WellDocument findMany
   */
  export type WellDocumentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WellDocument
     */
    select?: WellDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WellDocument
     */
    omit?: WellDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WellDocumentInclude<ExtArgs> | null
    /**
     * Filter, which WellDocuments to fetch.
     */
    where?: WellDocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WellDocuments to fetch.
     */
    orderBy?: WellDocumentOrderByWithRelationInput | WellDocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WellDocuments.
     */
    cursor?: WellDocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WellDocuments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WellDocuments.
     */
    skip?: number
    distinct?: WellDocumentScalarFieldEnum | WellDocumentScalarFieldEnum[]
  }

  /**
   * WellDocument create
   */
  export type WellDocumentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WellDocument
     */
    select?: WellDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WellDocument
     */
    omit?: WellDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WellDocumentInclude<ExtArgs> | null
    /**
     * The data needed to create a WellDocument.
     */
    data: XOR<WellDocumentCreateInput, WellDocumentUncheckedCreateInput>
  }

  /**
   * WellDocument createMany
   */
  export type WellDocumentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many WellDocuments.
     */
    data: WellDocumentCreateManyInput | WellDocumentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WellDocument createManyAndReturn
   */
  export type WellDocumentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WellDocument
     */
    select?: WellDocumentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WellDocument
     */
    omit?: WellDocumentOmit<ExtArgs> | null
    /**
     * The data used to create many WellDocuments.
     */
    data: WellDocumentCreateManyInput | WellDocumentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WellDocumentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * WellDocument update
   */
  export type WellDocumentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WellDocument
     */
    select?: WellDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WellDocument
     */
    omit?: WellDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WellDocumentInclude<ExtArgs> | null
    /**
     * The data needed to update a WellDocument.
     */
    data: XOR<WellDocumentUpdateInput, WellDocumentUncheckedUpdateInput>
    /**
     * Choose, which WellDocument to update.
     */
    where: WellDocumentWhereUniqueInput
  }

  /**
   * WellDocument updateMany
   */
  export type WellDocumentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WellDocuments.
     */
    data: XOR<WellDocumentUpdateManyMutationInput, WellDocumentUncheckedUpdateManyInput>
    /**
     * Filter which WellDocuments to update
     */
    where?: WellDocumentWhereInput
    /**
     * Limit how many WellDocuments to update.
     */
    limit?: number
  }

  /**
   * WellDocument updateManyAndReturn
   */
  export type WellDocumentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WellDocument
     */
    select?: WellDocumentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WellDocument
     */
    omit?: WellDocumentOmit<ExtArgs> | null
    /**
     * The data used to update WellDocuments.
     */
    data: XOR<WellDocumentUpdateManyMutationInput, WellDocumentUncheckedUpdateManyInput>
    /**
     * Filter which WellDocuments to update
     */
    where?: WellDocumentWhereInput
    /**
     * Limit how many WellDocuments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WellDocumentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * WellDocument upsert
   */
  export type WellDocumentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WellDocument
     */
    select?: WellDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WellDocument
     */
    omit?: WellDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WellDocumentInclude<ExtArgs> | null
    /**
     * The filter to search for the WellDocument to update in case it exists.
     */
    where: WellDocumentWhereUniqueInput
    /**
     * In case the WellDocument found by the `where` argument doesn't exist, create a new WellDocument with this data.
     */
    create: XOR<WellDocumentCreateInput, WellDocumentUncheckedCreateInput>
    /**
     * In case the WellDocument was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WellDocumentUpdateInput, WellDocumentUncheckedUpdateInput>
  }

  /**
   * WellDocument delete
   */
  export type WellDocumentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WellDocument
     */
    select?: WellDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WellDocument
     */
    omit?: WellDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WellDocumentInclude<ExtArgs> | null
    /**
     * Filter which WellDocument to delete.
     */
    where: WellDocumentWhereUniqueInput
  }

  /**
   * WellDocument deleteMany
   */
  export type WellDocumentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WellDocuments to delete
     */
    where?: WellDocumentWhereInput
    /**
     * Limit how many WellDocuments to delete.
     */
    limit?: number
  }

  /**
   * WellDocument without action
   */
  export type WellDocumentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WellDocument
     */
    select?: WellDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WellDocument
     */
    omit?: WellDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WellDocumentInclude<ExtArgs> | null
  }


  /**
   * Model WellRefCounter
   */

  export type AggregateWellRefCounter = {
    _count: WellRefCounterCountAggregateOutputType | null
    _avg: WellRefCounterAvgAggregateOutputType | null
    _sum: WellRefCounterSumAggregateOutputType | null
    _min: WellRefCounterMinAggregateOutputType | null
    _max: WellRefCounterMaxAggregateOutputType | null
  }

  export type WellRefCounterAvgAggregateOutputType = {
    id: number | null
    lastRef: number | null
  }

  export type WellRefCounterSumAggregateOutputType = {
    id: number | null
    lastRef: number | null
  }

  export type WellRefCounterMinAggregateOutputType = {
    id: number | null
    lastRef: number | null
  }

  export type WellRefCounterMaxAggregateOutputType = {
    id: number | null
    lastRef: number | null
  }

  export type WellRefCounterCountAggregateOutputType = {
    id: number
    lastRef: number
    _all: number
  }


  export type WellRefCounterAvgAggregateInputType = {
    id?: true
    lastRef?: true
  }

  export type WellRefCounterSumAggregateInputType = {
    id?: true
    lastRef?: true
  }

  export type WellRefCounterMinAggregateInputType = {
    id?: true
    lastRef?: true
  }

  export type WellRefCounterMaxAggregateInputType = {
    id?: true
    lastRef?: true
  }

  export type WellRefCounterCountAggregateInputType = {
    id?: true
    lastRef?: true
    _all?: true
  }

  export type WellRefCounterAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WellRefCounter to aggregate.
     */
    where?: WellRefCounterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WellRefCounters to fetch.
     */
    orderBy?: WellRefCounterOrderByWithRelationInput | WellRefCounterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WellRefCounterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WellRefCounters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WellRefCounters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WellRefCounters
    **/
    _count?: true | WellRefCounterCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: WellRefCounterAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: WellRefCounterSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WellRefCounterMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WellRefCounterMaxAggregateInputType
  }

  export type GetWellRefCounterAggregateType<T extends WellRefCounterAggregateArgs> = {
        [P in keyof T & keyof AggregateWellRefCounter]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWellRefCounter[P]>
      : GetScalarType<T[P], AggregateWellRefCounter[P]>
  }




  export type WellRefCounterGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WellRefCounterWhereInput
    orderBy?: WellRefCounterOrderByWithAggregationInput | WellRefCounterOrderByWithAggregationInput[]
    by: WellRefCounterScalarFieldEnum[] | WellRefCounterScalarFieldEnum
    having?: WellRefCounterScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WellRefCounterCountAggregateInputType | true
    _avg?: WellRefCounterAvgAggregateInputType
    _sum?: WellRefCounterSumAggregateInputType
    _min?: WellRefCounterMinAggregateInputType
    _max?: WellRefCounterMaxAggregateInputType
  }

  export type WellRefCounterGroupByOutputType = {
    id: number
    lastRef: number
    _count: WellRefCounterCountAggregateOutputType | null
    _avg: WellRefCounterAvgAggregateOutputType | null
    _sum: WellRefCounterSumAggregateOutputType | null
    _min: WellRefCounterMinAggregateOutputType | null
    _max: WellRefCounterMaxAggregateOutputType | null
  }

  type GetWellRefCounterGroupByPayload<T extends WellRefCounterGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WellRefCounterGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WellRefCounterGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WellRefCounterGroupByOutputType[P]>
            : GetScalarType<T[P], WellRefCounterGroupByOutputType[P]>
        }
      >
    >


  export type WellRefCounterSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    lastRef?: boolean
  }, ExtArgs["result"]["wellRefCounter"]>

  export type WellRefCounterSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    lastRef?: boolean
  }, ExtArgs["result"]["wellRefCounter"]>

  export type WellRefCounterSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    lastRef?: boolean
  }, ExtArgs["result"]["wellRefCounter"]>

  export type WellRefCounterSelectScalar = {
    id?: boolean
    lastRef?: boolean
  }

  export type WellRefCounterOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "lastRef", ExtArgs["result"]["wellRefCounter"]>

  export type $WellRefCounterPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WellRefCounter"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      lastRef: number
    }, ExtArgs["result"]["wellRefCounter"]>
    composites: {}
  }

  type WellRefCounterGetPayload<S extends boolean | null | undefined | WellRefCounterDefaultArgs> = $Result.GetResult<Prisma.$WellRefCounterPayload, S>

  type WellRefCounterCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WellRefCounterFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WellRefCounterCountAggregateInputType | true
    }

  export interface WellRefCounterDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WellRefCounter'], meta: { name: 'WellRefCounter' } }
    /**
     * Find zero or one WellRefCounter that matches the filter.
     * @param {WellRefCounterFindUniqueArgs} args - Arguments to find a WellRefCounter
     * @example
     * // Get one WellRefCounter
     * const wellRefCounter = await prisma.wellRefCounter.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WellRefCounterFindUniqueArgs>(args: SelectSubset<T, WellRefCounterFindUniqueArgs<ExtArgs>>): Prisma__WellRefCounterClient<$Result.GetResult<Prisma.$WellRefCounterPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one WellRefCounter that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WellRefCounterFindUniqueOrThrowArgs} args - Arguments to find a WellRefCounter
     * @example
     * // Get one WellRefCounter
     * const wellRefCounter = await prisma.wellRefCounter.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WellRefCounterFindUniqueOrThrowArgs>(args: SelectSubset<T, WellRefCounterFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WellRefCounterClient<$Result.GetResult<Prisma.$WellRefCounterPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WellRefCounter that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WellRefCounterFindFirstArgs} args - Arguments to find a WellRefCounter
     * @example
     * // Get one WellRefCounter
     * const wellRefCounter = await prisma.wellRefCounter.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WellRefCounterFindFirstArgs>(args?: SelectSubset<T, WellRefCounterFindFirstArgs<ExtArgs>>): Prisma__WellRefCounterClient<$Result.GetResult<Prisma.$WellRefCounterPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WellRefCounter that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WellRefCounterFindFirstOrThrowArgs} args - Arguments to find a WellRefCounter
     * @example
     * // Get one WellRefCounter
     * const wellRefCounter = await prisma.wellRefCounter.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WellRefCounterFindFirstOrThrowArgs>(args?: SelectSubset<T, WellRefCounterFindFirstOrThrowArgs<ExtArgs>>): Prisma__WellRefCounterClient<$Result.GetResult<Prisma.$WellRefCounterPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more WellRefCounters that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WellRefCounterFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WellRefCounters
     * const wellRefCounters = await prisma.wellRefCounter.findMany()
     * 
     * // Get first 10 WellRefCounters
     * const wellRefCounters = await prisma.wellRefCounter.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const wellRefCounterWithIdOnly = await prisma.wellRefCounter.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WellRefCounterFindManyArgs>(args?: SelectSubset<T, WellRefCounterFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WellRefCounterPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a WellRefCounter.
     * @param {WellRefCounterCreateArgs} args - Arguments to create a WellRefCounter.
     * @example
     * // Create one WellRefCounter
     * const WellRefCounter = await prisma.wellRefCounter.create({
     *   data: {
     *     // ... data to create a WellRefCounter
     *   }
     * })
     * 
     */
    create<T extends WellRefCounterCreateArgs>(args: SelectSubset<T, WellRefCounterCreateArgs<ExtArgs>>): Prisma__WellRefCounterClient<$Result.GetResult<Prisma.$WellRefCounterPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many WellRefCounters.
     * @param {WellRefCounterCreateManyArgs} args - Arguments to create many WellRefCounters.
     * @example
     * // Create many WellRefCounters
     * const wellRefCounter = await prisma.wellRefCounter.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WellRefCounterCreateManyArgs>(args?: SelectSubset<T, WellRefCounterCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many WellRefCounters and returns the data saved in the database.
     * @param {WellRefCounterCreateManyAndReturnArgs} args - Arguments to create many WellRefCounters.
     * @example
     * // Create many WellRefCounters
     * const wellRefCounter = await prisma.wellRefCounter.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many WellRefCounters and only return the `id`
     * const wellRefCounterWithIdOnly = await prisma.wellRefCounter.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WellRefCounterCreateManyAndReturnArgs>(args?: SelectSubset<T, WellRefCounterCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WellRefCounterPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a WellRefCounter.
     * @param {WellRefCounterDeleteArgs} args - Arguments to delete one WellRefCounter.
     * @example
     * // Delete one WellRefCounter
     * const WellRefCounter = await prisma.wellRefCounter.delete({
     *   where: {
     *     // ... filter to delete one WellRefCounter
     *   }
     * })
     * 
     */
    delete<T extends WellRefCounterDeleteArgs>(args: SelectSubset<T, WellRefCounterDeleteArgs<ExtArgs>>): Prisma__WellRefCounterClient<$Result.GetResult<Prisma.$WellRefCounterPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one WellRefCounter.
     * @param {WellRefCounterUpdateArgs} args - Arguments to update one WellRefCounter.
     * @example
     * // Update one WellRefCounter
     * const wellRefCounter = await prisma.wellRefCounter.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WellRefCounterUpdateArgs>(args: SelectSubset<T, WellRefCounterUpdateArgs<ExtArgs>>): Prisma__WellRefCounterClient<$Result.GetResult<Prisma.$WellRefCounterPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more WellRefCounters.
     * @param {WellRefCounterDeleteManyArgs} args - Arguments to filter WellRefCounters to delete.
     * @example
     * // Delete a few WellRefCounters
     * const { count } = await prisma.wellRefCounter.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WellRefCounterDeleteManyArgs>(args?: SelectSubset<T, WellRefCounterDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WellRefCounters.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WellRefCounterUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WellRefCounters
     * const wellRefCounter = await prisma.wellRefCounter.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WellRefCounterUpdateManyArgs>(args: SelectSubset<T, WellRefCounterUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WellRefCounters and returns the data updated in the database.
     * @param {WellRefCounterUpdateManyAndReturnArgs} args - Arguments to update many WellRefCounters.
     * @example
     * // Update many WellRefCounters
     * const wellRefCounter = await prisma.wellRefCounter.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more WellRefCounters and only return the `id`
     * const wellRefCounterWithIdOnly = await prisma.wellRefCounter.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends WellRefCounterUpdateManyAndReturnArgs>(args: SelectSubset<T, WellRefCounterUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WellRefCounterPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one WellRefCounter.
     * @param {WellRefCounterUpsertArgs} args - Arguments to update or create a WellRefCounter.
     * @example
     * // Update or create a WellRefCounter
     * const wellRefCounter = await prisma.wellRefCounter.upsert({
     *   create: {
     *     // ... data to create a WellRefCounter
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WellRefCounter we want to update
     *   }
     * })
     */
    upsert<T extends WellRefCounterUpsertArgs>(args: SelectSubset<T, WellRefCounterUpsertArgs<ExtArgs>>): Prisma__WellRefCounterClient<$Result.GetResult<Prisma.$WellRefCounterPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of WellRefCounters.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WellRefCounterCountArgs} args - Arguments to filter WellRefCounters to count.
     * @example
     * // Count the number of WellRefCounters
     * const count = await prisma.wellRefCounter.count({
     *   where: {
     *     // ... the filter for the WellRefCounters we want to count
     *   }
     * })
    **/
    count<T extends WellRefCounterCountArgs>(
      args?: Subset<T, WellRefCounterCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WellRefCounterCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WellRefCounter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WellRefCounterAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WellRefCounterAggregateArgs>(args: Subset<T, WellRefCounterAggregateArgs>): Prisma.PrismaPromise<GetWellRefCounterAggregateType<T>>

    /**
     * Group by WellRefCounter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WellRefCounterGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WellRefCounterGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WellRefCounterGroupByArgs['orderBy'] }
        : { orderBy?: WellRefCounterGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WellRefCounterGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWellRefCounterGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WellRefCounter model
   */
  readonly fields: WellRefCounterFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WellRefCounter.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WellRefCounterClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the WellRefCounter model
   */
  interface WellRefCounterFieldRefs {
    readonly id: FieldRef<"WellRefCounter", 'Int'>
    readonly lastRef: FieldRef<"WellRefCounter", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * WellRefCounter findUnique
   */
  export type WellRefCounterFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WellRefCounter
     */
    select?: WellRefCounterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WellRefCounter
     */
    omit?: WellRefCounterOmit<ExtArgs> | null
    /**
     * Filter, which WellRefCounter to fetch.
     */
    where: WellRefCounterWhereUniqueInput
  }

  /**
   * WellRefCounter findUniqueOrThrow
   */
  export type WellRefCounterFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WellRefCounter
     */
    select?: WellRefCounterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WellRefCounter
     */
    omit?: WellRefCounterOmit<ExtArgs> | null
    /**
     * Filter, which WellRefCounter to fetch.
     */
    where: WellRefCounterWhereUniqueInput
  }

  /**
   * WellRefCounter findFirst
   */
  export type WellRefCounterFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WellRefCounter
     */
    select?: WellRefCounterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WellRefCounter
     */
    omit?: WellRefCounterOmit<ExtArgs> | null
    /**
     * Filter, which WellRefCounter to fetch.
     */
    where?: WellRefCounterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WellRefCounters to fetch.
     */
    orderBy?: WellRefCounterOrderByWithRelationInput | WellRefCounterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WellRefCounters.
     */
    cursor?: WellRefCounterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WellRefCounters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WellRefCounters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WellRefCounters.
     */
    distinct?: WellRefCounterScalarFieldEnum | WellRefCounterScalarFieldEnum[]
  }

  /**
   * WellRefCounter findFirstOrThrow
   */
  export type WellRefCounterFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WellRefCounter
     */
    select?: WellRefCounterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WellRefCounter
     */
    omit?: WellRefCounterOmit<ExtArgs> | null
    /**
     * Filter, which WellRefCounter to fetch.
     */
    where?: WellRefCounterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WellRefCounters to fetch.
     */
    orderBy?: WellRefCounterOrderByWithRelationInput | WellRefCounterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WellRefCounters.
     */
    cursor?: WellRefCounterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WellRefCounters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WellRefCounters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WellRefCounters.
     */
    distinct?: WellRefCounterScalarFieldEnum | WellRefCounterScalarFieldEnum[]
  }

  /**
   * WellRefCounter findMany
   */
  export type WellRefCounterFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WellRefCounter
     */
    select?: WellRefCounterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WellRefCounter
     */
    omit?: WellRefCounterOmit<ExtArgs> | null
    /**
     * Filter, which WellRefCounters to fetch.
     */
    where?: WellRefCounterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WellRefCounters to fetch.
     */
    orderBy?: WellRefCounterOrderByWithRelationInput | WellRefCounterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WellRefCounters.
     */
    cursor?: WellRefCounterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WellRefCounters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WellRefCounters.
     */
    skip?: number
    distinct?: WellRefCounterScalarFieldEnum | WellRefCounterScalarFieldEnum[]
  }

  /**
   * WellRefCounter create
   */
  export type WellRefCounterCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WellRefCounter
     */
    select?: WellRefCounterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WellRefCounter
     */
    omit?: WellRefCounterOmit<ExtArgs> | null
    /**
     * The data needed to create a WellRefCounter.
     */
    data?: XOR<WellRefCounterCreateInput, WellRefCounterUncheckedCreateInput>
  }

  /**
   * WellRefCounter createMany
   */
  export type WellRefCounterCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many WellRefCounters.
     */
    data: WellRefCounterCreateManyInput | WellRefCounterCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WellRefCounter createManyAndReturn
   */
  export type WellRefCounterCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WellRefCounter
     */
    select?: WellRefCounterSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WellRefCounter
     */
    omit?: WellRefCounterOmit<ExtArgs> | null
    /**
     * The data used to create many WellRefCounters.
     */
    data: WellRefCounterCreateManyInput | WellRefCounterCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WellRefCounter update
   */
  export type WellRefCounterUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WellRefCounter
     */
    select?: WellRefCounterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WellRefCounter
     */
    omit?: WellRefCounterOmit<ExtArgs> | null
    /**
     * The data needed to update a WellRefCounter.
     */
    data: XOR<WellRefCounterUpdateInput, WellRefCounterUncheckedUpdateInput>
    /**
     * Choose, which WellRefCounter to update.
     */
    where: WellRefCounterWhereUniqueInput
  }

  /**
   * WellRefCounter updateMany
   */
  export type WellRefCounterUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WellRefCounters.
     */
    data: XOR<WellRefCounterUpdateManyMutationInput, WellRefCounterUncheckedUpdateManyInput>
    /**
     * Filter which WellRefCounters to update
     */
    where?: WellRefCounterWhereInput
    /**
     * Limit how many WellRefCounters to update.
     */
    limit?: number
  }

  /**
   * WellRefCounter updateManyAndReturn
   */
  export type WellRefCounterUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WellRefCounter
     */
    select?: WellRefCounterSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WellRefCounter
     */
    omit?: WellRefCounterOmit<ExtArgs> | null
    /**
     * The data used to update WellRefCounters.
     */
    data: XOR<WellRefCounterUpdateManyMutationInput, WellRefCounterUncheckedUpdateManyInput>
    /**
     * Filter which WellRefCounters to update
     */
    where?: WellRefCounterWhereInput
    /**
     * Limit how many WellRefCounters to update.
     */
    limit?: number
  }

  /**
   * WellRefCounter upsert
   */
  export type WellRefCounterUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WellRefCounter
     */
    select?: WellRefCounterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WellRefCounter
     */
    omit?: WellRefCounterOmit<ExtArgs> | null
    /**
     * The filter to search for the WellRefCounter to update in case it exists.
     */
    where: WellRefCounterWhereUniqueInput
    /**
     * In case the WellRefCounter found by the `where` argument doesn't exist, create a new WellRefCounter with this data.
     */
    create: XOR<WellRefCounterCreateInput, WellRefCounterUncheckedCreateInput>
    /**
     * In case the WellRefCounter was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WellRefCounterUpdateInput, WellRefCounterUncheckedUpdateInput>
  }

  /**
   * WellRefCounter delete
   */
  export type WellRefCounterDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WellRefCounter
     */
    select?: WellRefCounterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WellRefCounter
     */
    omit?: WellRefCounterOmit<ExtArgs> | null
    /**
     * Filter which WellRefCounter to delete.
     */
    where: WellRefCounterWhereUniqueInput
  }

  /**
   * WellRefCounter deleteMany
   */
  export type WellRefCounterDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WellRefCounters to delete
     */
    where?: WellRefCounterWhereInput
    /**
     * Limit how many WellRefCounters to delete.
     */
    limit?: number
  }

  /**
   * WellRefCounter without action
   */
  export type WellRefCounterDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WellRefCounter
     */
    select?: WellRefCounterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WellRefCounter
     */
    omit?: WellRefCounterOmit<ExtArgs> | null
  }


  /**
   * Model WellShipmentNote
   */

  export type AggregateWellShipmentNote = {
    _count: WellShipmentNoteCountAggregateOutputType | null
    _min: WellShipmentNoteMinAggregateOutputType | null
    _max: WellShipmentNoteMaxAggregateOutputType | null
  }

  export type WellShipmentNoteMinAggregateOutputType = {
    id: string | null
    shipmentId: string | null
    note: string | null
    createdBy: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type WellShipmentNoteMaxAggregateOutputType = {
    id: string | null
    shipmentId: string | null
    note: string | null
    createdBy: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type WellShipmentNoteCountAggregateOutputType = {
    id: number
    shipmentId: number
    note: number
    createdBy: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type WellShipmentNoteMinAggregateInputType = {
    id?: true
    shipmentId?: true
    note?: true
    createdBy?: true
    createdAt?: true
    updatedAt?: true
  }

  export type WellShipmentNoteMaxAggregateInputType = {
    id?: true
    shipmentId?: true
    note?: true
    createdBy?: true
    createdAt?: true
    updatedAt?: true
  }

  export type WellShipmentNoteCountAggregateInputType = {
    id?: true
    shipmentId?: true
    note?: true
    createdBy?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type WellShipmentNoteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WellShipmentNote to aggregate.
     */
    where?: WellShipmentNoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WellShipmentNotes to fetch.
     */
    orderBy?: WellShipmentNoteOrderByWithRelationInput | WellShipmentNoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WellShipmentNoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WellShipmentNotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WellShipmentNotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WellShipmentNotes
    **/
    _count?: true | WellShipmentNoteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WellShipmentNoteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WellShipmentNoteMaxAggregateInputType
  }

  export type GetWellShipmentNoteAggregateType<T extends WellShipmentNoteAggregateArgs> = {
        [P in keyof T & keyof AggregateWellShipmentNote]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWellShipmentNote[P]>
      : GetScalarType<T[P], AggregateWellShipmentNote[P]>
  }




  export type WellShipmentNoteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WellShipmentNoteWhereInput
    orderBy?: WellShipmentNoteOrderByWithAggregationInput | WellShipmentNoteOrderByWithAggregationInput[]
    by: WellShipmentNoteScalarFieldEnum[] | WellShipmentNoteScalarFieldEnum
    having?: WellShipmentNoteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WellShipmentNoteCountAggregateInputType | true
    _min?: WellShipmentNoteMinAggregateInputType
    _max?: WellShipmentNoteMaxAggregateInputType
  }

  export type WellShipmentNoteGroupByOutputType = {
    id: string
    shipmentId: string
    note: string
    createdBy: string
    createdAt: Date
    updatedAt: Date
    _count: WellShipmentNoteCountAggregateOutputType | null
    _min: WellShipmentNoteMinAggregateOutputType | null
    _max: WellShipmentNoteMaxAggregateOutputType | null
  }

  type GetWellShipmentNoteGroupByPayload<T extends WellShipmentNoteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WellShipmentNoteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WellShipmentNoteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WellShipmentNoteGroupByOutputType[P]>
            : GetScalarType<T[P], WellShipmentNoteGroupByOutputType[P]>
        }
      >
    >


  export type WellShipmentNoteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    shipmentId?: boolean
    note?: boolean
    createdBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    shipment?: boolean | WellShipmentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["wellShipmentNote"]>

  export type WellShipmentNoteSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    shipmentId?: boolean
    note?: boolean
    createdBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    shipment?: boolean | WellShipmentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["wellShipmentNote"]>

  export type WellShipmentNoteSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    shipmentId?: boolean
    note?: boolean
    createdBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    shipment?: boolean | WellShipmentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["wellShipmentNote"]>

  export type WellShipmentNoteSelectScalar = {
    id?: boolean
    shipmentId?: boolean
    note?: boolean
    createdBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type WellShipmentNoteOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "shipmentId" | "note" | "createdBy" | "createdAt" | "updatedAt", ExtArgs["result"]["wellShipmentNote"]>
  export type WellShipmentNoteInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    shipment?: boolean | WellShipmentDefaultArgs<ExtArgs>
  }
  export type WellShipmentNoteIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    shipment?: boolean | WellShipmentDefaultArgs<ExtArgs>
  }
  export type WellShipmentNoteIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    shipment?: boolean | WellShipmentDefaultArgs<ExtArgs>
  }

  export type $WellShipmentNotePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WellShipmentNote"
    objects: {
      shipment: Prisma.$WellShipmentPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      shipmentId: string
      note: string
      createdBy: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["wellShipmentNote"]>
    composites: {}
  }

  type WellShipmentNoteGetPayload<S extends boolean | null | undefined | WellShipmentNoteDefaultArgs> = $Result.GetResult<Prisma.$WellShipmentNotePayload, S>

  type WellShipmentNoteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WellShipmentNoteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WellShipmentNoteCountAggregateInputType | true
    }

  export interface WellShipmentNoteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WellShipmentNote'], meta: { name: 'WellShipmentNote' } }
    /**
     * Find zero or one WellShipmentNote that matches the filter.
     * @param {WellShipmentNoteFindUniqueArgs} args - Arguments to find a WellShipmentNote
     * @example
     * // Get one WellShipmentNote
     * const wellShipmentNote = await prisma.wellShipmentNote.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WellShipmentNoteFindUniqueArgs>(args: SelectSubset<T, WellShipmentNoteFindUniqueArgs<ExtArgs>>): Prisma__WellShipmentNoteClient<$Result.GetResult<Prisma.$WellShipmentNotePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one WellShipmentNote that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WellShipmentNoteFindUniqueOrThrowArgs} args - Arguments to find a WellShipmentNote
     * @example
     * // Get one WellShipmentNote
     * const wellShipmentNote = await prisma.wellShipmentNote.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WellShipmentNoteFindUniqueOrThrowArgs>(args: SelectSubset<T, WellShipmentNoteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WellShipmentNoteClient<$Result.GetResult<Prisma.$WellShipmentNotePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WellShipmentNote that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WellShipmentNoteFindFirstArgs} args - Arguments to find a WellShipmentNote
     * @example
     * // Get one WellShipmentNote
     * const wellShipmentNote = await prisma.wellShipmentNote.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WellShipmentNoteFindFirstArgs>(args?: SelectSubset<T, WellShipmentNoteFindFirstArgs<ExtArgs>>): Prisma__WellShipmentNoteClient<$Result.GetResult<Prisma.$WellShipmentNotePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WellShipmentNote that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WellShipmentNoteFindFirstOrThrowArgs} args - Arguments to find a WellShipmentNote
     * @example
     * // Get one WellShipmentNote
     * const wellShipmentNote = await prisma.wellShipmentNote.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WellShipmentNoteFindFirstOrThrowArgs>(args?: SelectSubset<T, WellShipmentNoteFindFirstOrThrowArgs<ExtArgs>>): Prisma__WellShipmentNoteClient<$Result.GetResult<Prisma.$WellShipmentNotePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more WellShipmentNotes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WellShipmentNoteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WellShipmentNotes
     * const wellShipmentNotes = await prisma.wellShipmentNote.findMany()
     * 
     * // Get first 10 WellShipmentNotes
     * const wellShipmentNotes = await prisma.wellShipmentNote.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const wellShipmentNoteWithIdOnly = await prisma.wellShipmentNote.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WellShipmentNoteFindManyArgs>(args?: SelectSubset<T, WellShipmentNoteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WellShipmentNotePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a WellShipmentNote.
     * @param {WellShipmentNoteCreateArgs} args - Arguments to create a WellShipmentNote.
     * @example
     * // Create one WellShipmentNote
     * const WellShipmentNote = await prisma.wellShipmentNote.create({
     *   data: {
     *     // ... data to create a WellShipmentNote
     *   }
     * })
     * 
     */
    create<T extends WellShipmentNoteCreateArgs>(args: SelectSubset<T, WellShipmentNoteCreateArgs<ExtArgs>>): Prisma__WellShipmentNoteClient<$Result.GetResult<Prisma.$WellShipmentNotePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many WellShipmentNotes.
     * @param {WellShipmentNoteCreateManyArgs} args - Arguments to create many WellShipmentNotes.
     * @example
     * // Create many WellShipmentNotes
     * const wellShipmentNote = await prisma.wellShipmentNote.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WellShipmentNoteCreateManyArgs>(args?: SelectSubset<T, WellShipmentNoteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many WellShipmentNotes and returns the data saved in the database.
     * @param {WellShipmentNoteCreateManyAndReturnArgs} args - Arguments to create many WellShipmentNotes.
     * @example
     * // Create many WellShipmentNotes
     * const wellShipmentNote = await prisma.wellShipmentNote.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many WellShipmentNotes and only return the `id`
     * const wellShipmentNoteWithIdOnly = await prisma.wellShipmentNote.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WellShipmentNoteCreateManyAndReturnArgs>(args?: SelectSubset<T, WellShipmentNoteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WellShipmentNotePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a WellShipmentNote.
     * @param {WellShipmentNoteDeleteArgs} args - Arguments to delete one WellShipmentNote.
     * @example
     * // Delete one WellShipmentNote
     * const WellShipmentNote = await prisma.wellShipmentNote.delete({
     *   where: {
     *     // ... filter to delete one WellShipmentNote
     *   }
     * })
     * 
     */
    delete<T extends WellShipmentNoteDeleteArgs>(args: SelectSubset<T, WellShipmentNoteDeleteArgs<ExtArgs>>): Prisma__WellShipmentNoteClient<$Result.GetResult<Prisma.$WellShipmentNotePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one WellShipmentNote.
     * @param {WellShipmentNoteUpdateArgs} args - Arguments to update one WellShipmentNote.
     * @example
     * // Update one WellShipmentNote
     * const wellShipmentNote = await prisma.wellShipmentNote.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WellShipmentNoteUpdateArgs>(args: SelectSubset<T, WellShipmentNoteUpdateArgs<ExtArgs>>): Prisma__WellShipmentNoteClient<$Result.GetResult<Prisma.$WellShipmentNotePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more WellShipmentNotes.
     * @param {WellShipmentNoteDeleteManyArgs} args - Arguments to filter WellShipmentNotes to delete.
     * @example
     * // Delete a few WellShipmentNotes
     * const { count } = await prisma.wellShipmentNote.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WellShipmentNoteDeleteManyArgs>(args?: SelectSubset<T, WellShipmentNoteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WellShipmentNotes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WellShipmentNoteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WellShipmentNotes
     * const wellShipmentNote = await prisma.wellShipmentNote.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WellShipmentNoteUpdateManyArgs>(args: SelectSubset<T, WellShipmentNoteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WellShipmentNotes and returns the data updated in the database.
     * @param {WellShipmentNoteUpdateManyAndReturnArgs} args - Arguments to update many WellShipmentNotes.
     * @example
     * // Update many WellShipmentNotes
     * const wellShipmentNote = await prisma.wellShipmentNote.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more WellShipmentNotes and only return the `id`
     * const wellShipmentNoteWithIdOnly = await prisma.wellShipmentNote.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends WellShipmentNoteUpdateManyAndReturnArgs>(args: SelectSubset<T, WellShipmentNoteUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WellShipmentNotePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one WellShipmentNote.
     * @param {WellShipmentNoteUpsertArgs} args - Arguments to update or create a WellShipmentNote.
     * @example
     * // Update or create a WellShipmentNote
     * const wellShipmentNote = await prisma.wellShipmentNote.upsert({
     *   create: {
     *     // ... data to create a WellShipmentNote
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WellShipmentNote we want to update
     *   }
     * })
     */
    upsert<T extends WellShipmentNoteUpsertArgs>(args: SelectSubset<T, WellShipmentNoteUpsertArgs<ExtArgs>>): Prisma__WellShipmentNoteClient<$Result.GetResult<Prisma.$WellShipmentNotePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of WellShipmentNotes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WellShipmentNoteCountArgs} args - Arguments to filter WellShipmentNotes to count.
     * @example
     * // Count the number of WellShipmentNotes
     * const count = await prisma.wellShipmentNote.count({
     *   where: {
     *     // ... the filter for the WellShipmentNotes we want to count
     *   }
     * })
    **/
    count<T extends WellShipmentNoteCountArgs>(
      args?: Subset<T, WellShipmentNoteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WellShipmentNoteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WellShipmentNote.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WellShipmentNoteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WellShipmentNoteAggregateArgs>(args: Subset<T, WellShipmentNoteAggregateArgs>): Prisma.PrismaPromise<GetWellShipmentNoteAggregateType<T>>

    /**
     * Group by WellShipmentNote.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WellShipmentNoteGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WellShipmentNoteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WellShipmentNoteGroupByArgs['orderBy'] }
        : { orderBy?: WellShipmentNoteGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WellShipmentNoteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWellShipmentNoteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WellShipmentNote model
   */
  readonly fields: WellShipmentNoteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WellShipmentNote.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WellShipmentNoteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    shipment<T extends WellShipmentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, WellShipmentDefaultArgs<ExtArgs>>): Prisma__WellShipmentClient<$Result.GetResult<Prisma.$WellShipmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the WellShipmentNote model
   */
  interface WellShipmentNoteFieldRefs {
    readonly id: FieldRef<"WellShipmentNote", 'String'>
    readonly shipmentId: FieldRef<"WellShipmentNote", 'String'>
    readonly note: FieldRef<"WellShipmentNote", 'String'>
    readonly createdBy: FieldRef<"WellShipmentNote", 'String'>
    readonly createdAt: FieldRef<"WellShipmentNote", 'DateTime'>
    readonly updatedAt: FieldRef<"WellShipmentNote", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * WellShipmentNote findUnique
   */
  export type WellShipmentNoteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WellShipmentNote
     */
    select?: WellShipmentNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WellShipmentNote
     */
    omit?: WellShipmentNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WellShipmentNoteInclude<ExtArgs> | null
    /**
     * Filter, which WellShipmentNote to fetch.
     */
    where: WellShipmentNoteWhereUniqueInput
  }

  /**
   * WellShipmentNote findUniqueOrThrow
   */
  export type WellShipmentNoteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WellShipmentNote
     */
    select?: WellShipmentNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WellShipmentNote
     */
    omit?: WellShipmentNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WellShipmentNoteInclude<ExtArgs> | null
    /**
     * Filter, which WellShipmentNote to fetch.
     */
    where: WellShipmentNoteWhereUniqueInput
  }

  /**
   * WellShipmentNote findFirst
   */
  export type WellShipmentNoteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WellShipmentNote
     */
    select?: WellShipmentNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WellShipmentNote
     */
    omit?: WellShipmentNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WellShipmentNoteInclude<ExtArgs> | null
    /**
     * Filter, which WellShipmentNote to fetch.
     */
    where?: WellShipmentNoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WellShipmentNotes to fetch.
     */
    orderBy?: WellShipmentNoteOrderByWithRelationInput | WellShipmentNoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WellShipmentNotes.
     */
    cursor?: WellShipmentNoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WellShipmentNotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WellShipmentNotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WellShipmentNotes.
     */
    distinct?: WellShipmentNoteScalarFieldEnum | WellShipmentNoteScalarFieldEnum[]
  }

  /**
   * WellShipmentNote findFirstOrThrow
   */
  export type WellShipmentNoteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WellShipmentNote
     */
    select?: WellShipmentNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WellShipmentNote
     */
    omit?: WellShipmentNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WellShipmentNoteInclude<ExtArgs> | null
    /**
     * Filter, which WellShipmentNote to fetch.
     */
    where?: WellShipmentNoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WellShipmentNotes to fetch.
     */
    orderBy?: WellShipmentNoteOrderByWithRelationInput | WellShipmentNoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WellShipmentNotes.
     */
    cursor?: WellShipmentNoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WellShipmentNotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WellShipmentNotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WellShipmentNotes.
     */
    distinct?: WellShipmentNoteScalarFieldEnum | WellShipmentNoteScalarFieldEnum[]
  }

  /**
   * WellShipmentNote findMany
   */
  export type WellShipmentNoteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WellShipmentNote
     */
    select?: WellShipmentNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WellShipmentNote
     */
    omit?: WellShipmentNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WellShipmentNoteInclude<ExtArgs> | null
    /**
     * Filter, which WellShipmentNotes to fetch.
     */
    where?: WellShipmentNoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WellShipmentNotes to fetch.
     */
    orderBy?: WellShipmentNoteOrderByWithRelationInput | WellShipmentNoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WellShipmentNotes.
     */
    cursor?: WellShipmentNoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WellShipmentNotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WellShipmentNotes.
     */
    skip?: number
    distinct?: WellShipmentNoteScalarFieldEnum | WellShipmentNoteScalarFieldEnum[]
  }

  /**
   * WellShipmentNote create
   */
  export type WellShipmentNoteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WellShipmentNote
     */
    select?: WellShipmentNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WellShipmentNote
     */
    omit?: WellShipmentNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WellShipmentNoteInclude<ExtArgs> | null
    /**
     * The data needed to create a WellShipmentNote.
     */
    data: XOR<WellShipmentNoteCreateInput, WellShipmentNoteUncheckedCreateInput>
  }

  /**
   * WellShipmentNote createMany
   */
  export type WellShipmentNoteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many WellShipmentNotes.
     */
    data: WellShipmentNoteCreateManyInput | WellShipmentNoteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WellShipmentNote createManyAndReturn
   */
  export type WellShipmentNoteCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WellShipmentNote
     */
    select?: WellShipmentNoteSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WellShipmentNote
     */
    omit?: WellShipmentNoteOmit<ExtArgs> | null
    /**
     * The data used to create many WellShipmentNotes.
     */
    data: WellShipmentNoteCreateManyInput | WellShipmentNoteCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WellShipmentNoteIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * WellShipmentNote update
   */
  export type WellShipmentNoteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WellShipmentNote
     */
    select?: WellShipmentNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WellShipmentNote
     */
    omit?: WellShipmentNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WellShipmentNoteInclude<ExtArgs> | null
    /**
     * The data needed to update a WellShipmentNote.
     */
    data: XOR<WellShipmentNoteUpdateInput, WellShipmentNoteUncheckedUpdateInput>
    /**
     * Choose, which WellShipmentNote to update.
     */
    where: WellShipmentNoteWhereUniqueInput
  }

  /**
   * WellShipmentNote updateMany
   */
  export type WellShipmentNoteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WellShipmentNotes.
     */
    data: XOR<WellShipmentNoteUpdateManyMutationInput, WellShipmentNoteUncheckedUpdateManyInput>
    /**
     * Filter which WellShipmentNotes to update
     */
    where?: WellShipmentNoteWhereInput
    /**
     * Limit how many WellShipmentNotes to update.
     */
    limit?: number
  }

  /**
   * WellShipmentNote updateManyAndReturn
   */
  export type WellShipmentNoteUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WellShipmentNote
     */
    select?: WellShipmentNoteSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WellShipmentNote
     */
    omit?: WellShipmentNoteOmit<ExtArgs> | null
    /**
     * The data used to update WellShipmentNotes.
     */
    data: XOR<WellShipmentNoteUpdateManyMutationInput, WellShipmentNoteUncheckedUpdateManyInput>
    /**
     * Filter which WellShipmentNotes to update
     */
    where?: WellShipmentNoteWhereInput
    /**
     * Limit how many WellShipmentNotes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WellShipmentNoteIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * WellShipmentNote upsert
   */
  export type WellShipmentNoteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WellShipmentNote
     */
    select?: WellShipmentNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WellShipmentNote
     */
    omit?: WellShipmentNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WellShipmentNoteInclude<ExtArgs> | null
    /**
     * The filter to search for the WellShipmentNote to update in case it exists.
     */
    where: WellShipmentNoteWhereUniqueInput
    /**
     * In case the WellShipmentNote found by the `where` argument doesn't exist, create a new WellShipmentNote with this data.
     */
    create: XOR<WellShipmentNoteCreateInput, WellShipmentNoteUncheckedCreateInput>
    /**
     * In case the WellShipmentNote was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WellShipmentNoteUpdateInput, WellShipmentNoteUncheckedUpdateInput>
  }

  /**
   * WellShipmentNote delete
   */
  export type WellShipmentNoteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WellShipmentNote
     */
    select?: WellShipmentNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WellShipmentNote
     */
    omit?: WellShipmentNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WellShipmentNoteInclude<ExtArgs> | null
    /**
     * Filter which WellShipmentNote to delete.
     */
    where: WellShipmentNoteWhereUniqueInput
  }

  /**
   * WellShipmentNote deleteMany
   */
  export type WellShipmentNoteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WellShipmentNotes to delete
     */
    where?: WellShipmentNoteWhereInput
    /**
     * Limit how many WellShipmentNotes to delete.
     */
    limit?: number
  }

  /**
   * WellShipmentNote without action
   */
  export type WellShipmentNoteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WellShipmentNote
     */
    select?: WellShipmentNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WellShipmentNote
     */
    omit?: WellShipmentNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WellShipmentNoteInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const ShipmentScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    clientName: 'clientName',
    blNumber: 'blNumber',
    status: 'status',
    containerCount: 'containerCount',
    isFeriSkipped: 'isFeriSkipped',
    feriNumber: 'feriNumber',
    proformaNumber: 'proformaNumber',
    proformaAmountEUR: 'proformaAmountEUR',
    commissionEUR: 'commissionEUR',
    exchangeRate: 'exchangeRate',
    adAmountUSD: 'adAmountUSD',
    tioNumber: 'tioNumber',
    ferriUSD: 'ferriUSD',
    commUSD: 'commUSD',
    totalUSD: 'totalUSD',
    wellRevenue: 'wellRevenue',
    musungoRevenue: 'musungoRevenue',
    ogefremRevenue: 'ogefremRevenue',
    invoiceNumber: 'invoiceNumber',
    invoiceDate: 'invoiceDate',
    vesselName: 'vesselName',
    entryNumber: 'entryNumber',
    roeKsh: 'roeKsh',
    hsCode: 'hsCode',
    preparedBy: 'preparedBy',
    cuInvoiceNumber: 'cuInvoiceNumber',
    qrCodeUrl: 'qrCodeUrl',
    cuDateTime: 'cuDateTime',
    cuSerialNumber: 'cuSerialNumber',
    customerPin: 'customerPin'
  };

  export type ShipmentScalarFieldEnum = (typeof ShipmentScalarFieldEnum)[keyof typeof ShipmentScalarFieldEnum]


  export const DocumentScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    shipmentId: 'shipmentId',
    type: 'type',
    filename: 'filename',
    driveFileId: 'driveFileId',
    driveUrl: 'driveUrl',
    version: 'version',
    isReplaced: 'isReplaced'
  };

  export type DocumentScalarFieldEnum = (typeof DocumentScalarFieldEnum)[keyof typeof DocumentScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    username: 'username',
    password: 'password',
    role: 'role',
    department: 'department',
    isSuspended: 'isSuspended',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const ResetTokenScalarFieldEnum: {
    id: 'id',
    token: 'token',
    expires: 'expires',
    createdAt: 'createdAt',
    userId: 'userId'
  };

  export type ResetTokenScalarFieldEnum = (typeof ResetTokenScalarFieldEnum)[keyof typeof ResetTokenScalarFieldEnum]


  export const ActivityLogScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    userId: 'userId',
    action: 'action',
    entity: 'entity',
    entityId: 'entityId',
    detail: 'detail'
  };

  export type ActivityLogScalarFieldEnum = (typeof ActivityLogScalarFieldEnum)[keyof typeof ActivityLogScalarFieldEnum]


  export const WellShipmentScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    refNumber: 'refNumber',
    clientName: 'clientName',
    clientRef: 'clientRef',
    blNumber: 'blNumber',
    containerSize: 'containerSize',
    vesselName: 'vesselName',
    eta: 'eta',
    status: 'status',
    health: 'health',
    healthReason: 'healthReason',
    currentStage: 'currentStage',
    assignedOperator: 'assignedOperator',
    shippingLine: 'shippingLine',
    origin: 'origin',
    destination: 'destination',
    finalDelivery: 'finalDelivery',
    transporter: 'transporter',
    docRecv: 'docRecv',
    lodgeCustoms: 'lodgeCustoms',
    entryNumber: 'entryNumber',
    entryPassed: 'entryPassed',
    tblNtbl: 'tblNtbl',
    slineCharges: 'slineCharges',
    slinePaid: 'slinePaid',
    ddRecv: 'ddRecv',
    lastSlingCfs: 'lastSlingCfs',
    lodgedKpa: 'lodgedKpa',
    dateVerified: 'dateVerified',
    isPaid: 'isPaid',
    paidAt: 'paidAt',
    amount: 'amount',
    roeKsh: 'roeKsh',
    invoiceDate: 'invoiceDate',
    notes: 'notes'
  };

  export type WellShipmentScalarFieldEnum = (typeof WellShipmentScalarFieldEnum)[keyof typeof WellShipmentScalarFieldEnum]


  export const WellEventScalarFieldEnum: {
    id: 'id',
    shipmentId: 'shipmentId',
    title: 'title',
    description: 'description',
    stage: 'stage',
    source: 'source',
    updatedBy: 'updatedBy',
    reference: 'reference',
    createdAt: 'createdAt'
  };

  export type WellEventScalarFieldEnum = (typeof WellEventScalarFieldEnum)[keyof typeof WellEventScalarFieldEnum]


  export const WellExceptionScalarFieldEnum: {
    id: 'id',
    shipmentId: 'shipmentId',
    containerId: 'containerId',
    issueType: 'issueType',
    severity: 'severity',
    status: 'status',
    description: 'description',
    expectedResolution: 'expectedResolution',
    assignedTo: 'assignedTo',
    dueDate: 'dueDate',
    createdBy: 'createdBy',
    createdAt: 'createdAt',
    resolvedAt: 'resolvedAt',
    resolvedBy: 'resolvedBy'
  };

  export type WellExceptionScalarFieldEnum = (typeof WellExceptionScalarFieldEnum)[keyof typeof WellExceptionScalarFieldEnum]


  export const WellContainerScalarFieldEnum: {
    id: 'id',
    shipmentId: 'shipmentId',
    containerNumber: 'containerNumber',
    size: 'size',
    weight: 'weight',
    dischargeDate: 'dischargeDate',
    gateOutDate: 'gateOutDate',
    truckDetails: 'truckDetails',
    driverName: 'driverName',
    status: 'status',
    remarks: 'remarks',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type WellContainerScalarFieldEnum = (typeof WellContainerScalarFieldEnum)[keyof typeof WellContainerScalarFieldEnum]


  export const WellDocumentScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    shipmentId: 'shipmentId',
    filename: 'filename',
    driveFileId: 'driveFileId',
    driveUrl: 'driveUrl',
    docType: 'docType'
  };

  export type WellDocumentScalarFieldEnum = (typeof WellDocumentScalarFieldEnum)[keyof typeof WellDocumentScalarFieldEnum]


  export const WellRefCounterScalarFieldEnum: {
    id: 'id',
    lastRef: 'lastRef'
  };

  export type WellRefCounterScalarFieldEnum = (typeof WellRefCounterScalarFieldEnum)[keyof typeof WellRefCounterScalarFieldEnum]


  export const WellShipmentNoteScalarFieldEnum: {
    id: 'id',
    shipmentId: 'shipmentId',
    note: 'note',
    createdBy: 'createdBy',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type WellShipmentNoteScalarFieldEnum = (typeof WellShipmentNoteScalarFieldEnum)[keyof typeof WellShipmentNoteScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'ShipmentStatus'
   */
  export type EnumShipmentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ShipmentStatus'>
    


  /**
   * Reference to a field of type 'ShipmentStatus[]'
   */
  export type ListEnumShipmentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ShipmentStatus[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'DocumentType'
   */
  export type EnumDocumentTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DocumentType'>
    


  /**
   * Reference to a field of type 'DocumentType[]'
   */
  export type ListEnumDocumentTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DocumentType[]'>
    


  /**
   * Reference to a field of type 'WellShipmentStatus'
   */
  export type EnumWellShipmentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'WellShipmentStatus'>
    


  /**
   * Reference to a field of type 'WellShipmentStatus[]'
   */
  export type ListEnumWellShipmentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'WellShipmentStatus[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type ShipmentWhereInput = {
    AND?: ShipmentWhereInput | ShipmentWhereInput[]
    OR?: ShipmentWhereInput[]
    NOT?: ShipmentWhereInput | ShipmentWhereInput[]
    id?: StringFilter<"Shipment"> | string
    createdAt?: DateTimeFilter<"Shipment"> | Date | string
    updatedAt?: DateTimeFilter<"Shipment"> | Date | string
    clientName?: StringFilter<"Shipment"> | string
    blNumber?: StringFilter<"Shipment"> | string
    status?: EnumShipmentStatusFilter<"Shipment"> | $Enums.ShipmentStatus
    containerCount?: IntFilter<"Shipment"> | number
    isFeriSkipped?: BoolFilter<"Shipment"> | boolean
    feriNumber?: StringNullableFilter<"Shipment"> | string | null
    proformaNumber?: StringNullableFilter<"Shipment"> | string | null
    proformaAmountEUR?: DecimalNullableFilter<"Shipment"> | Decimal | DecimalJsLike | number | string | null
    commissionEUR?: DecimalNullableFilter<"Shipment"> | Decimal | DecimalJsLike | number | string | null
    exchangeRate?: DecimalNullableFilter<"Shipment"> | Decimal | DecimalJsLike | number | string | null
    adAmountUSD?: DecimalNullableFilter<"Shipment"> | Decimal | DecimalJsLike | number | string | null
    tioNumber?: StringNullableFilter<"Shipment"> | string | null
    ferriUSD?: DecimalNullableFilter<"Shipment"> | Decimal | DecimalJsLike | number | string | null
    commUSD?: DecimalNullableFilter<"Shipment"> | Decimal | DecimalJsLike | number | string | null
    totalUSD?: DecimalNullableFilter<"Shipment"> | Decimal | DecimalJsLike | number | string | null
    wellRevenue?: DecimalNullableFilter<"Shipment"> | Decimal | DecimalJsLike | number | string | null
    musungoRevenue?: DecimalNullableFilter<"Shipment"> | Decimal | DecimalJsLike | number | string | null
    ogefremRevenue?: DecimalNullableFilter<"Shipment"> | Decimal | DecimalJsLike | number | string | null
    invoiceNumber?: StringNullableFilter<"Shipment"> | string | null
    invoiceDate?: DateTimeNullableFilter<"Shipment"> | Date | string | null
    vesselName?: StringNullableFilter<"Shipment"> | string | null
    entryNumber?: StringNullableFilter<"Shipment"> | string | null
    roeKsh?: DecimalNullableFilter<"Shipment"> | Decimal | DecimalJsLike | number | string | null
    hsCode?: StringNullableFilter<"Shipment"> | string | null
    preparedBy?: StringNullableFilter<"Shipment"> | string | null
    cuInvoiceNumber?: StringNullableFilter<"Shipment"> | string | null
    qrCodeUrl?: StringNullableFilter<"Shipment"> | string | null
    cuDateTime?: DateTimeNullableFilter<"Shipment"> | Date | string | null
    cuSerialNumber?: StringNullableFilter<"Shipment"> | string | null
    customerPin?: StringNullableFilter<"Shipment"> | string | null
    documents?: DocumentListRelationFilter
  }

  export type ShipmentOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    clientName?: SortOrder
    blNumber?: SortOrder
    status?: SortOrder
    containerCount?: SortOrder
    isFeriSkipped?: SortOrder
    feriNumber?: SortOrderInput | SortOrder
    proformaNumber?: SortOrderInput | SortOrder
    proformaAmountEUR?: SortOrderInput | SortOrder
    commissionEUR?: SortOrderInput | SortOrder
    exchangeRate?: SortOrderInput | SortOrder
    adAmountUSD?: SortOrderInput | SortOrder
    tioNumber?: SortOrderInput | SortOrder
    ferriUSD?: SortOrderInput | SortOrder
    commUSD?: SortOrderInput | SortOrder
    totalUSD?: SortOrderInput | SortOrder
    wellRevenue?: SortOrderInput | SortOrder
    musungoRevenue?: SortOrderInput | SortOrder
    ogefremRevenue?: SortOrderInput | SortOrder
    invoiceNumber?: SortOrderInput | SortOrder
    invoiceDate?: SortOrderInput | SortOrder
    vesselName?: SortOrderInput | SortOrder
    entryNumber?: SortOrderInput | SortOrder
    roeKsh?: SortOrderInput | SortOrder
    hsCode?: SortOrderInput | SortOrder
    preparedBy?: SortOrderInput | SortOrder
    cuInvoiceNumber?: SortOrderInput | SortOrder
    qrCodeUrl?: SortOrderInput | SortOrder
    cuDateTime?: SortOrderInput | SortOrder
    cuSerialNumber?: SortOrderInput | SortOrder
    customerPin?: SortOrderInput | SortOrder
    documents?: DocumentOrderByRelationAggregateInput
  }

  export type ShipmentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    blNumber?: string
    invoiceNumber?: string
    AND?: ShipmentWhereInput | ShipmentWhereInput[]
    OR?: ShipmentWhereInput[]
    NOT?: ShipmentWhereInput | ShipmentWhereInput[]
    createdAt?: DateTimeFilter<"Shipment"> | Date | string
    updatedAt?: DateTimeFilter<"Shipment"> | Date | string
    clientName?: StringFilter<"Shipment"> | string
    status?: EnumShipmentStatusFilter<"Shipment"> | $Enums.ShipmentStatus
    containerCount?: IntFilter<"Shipment"> | number
    isFeriSkipped?: BoolFilter<"Shipment"> | boolean
    feriNumber?: StringNullableFilter<"Shipment"> | string | null
    proformaNumber?: StringNullableFilter<"Shipment"> | string | null
    proformaAmountEUR?: DecimalNullableFilter<"Shipment"> | Decimal | DecimalJsLike | number | string | null
    commissionEUR?: DecimalNullableFilter<"Shipment"> | Decimal | DecimalJsLike | number | string | null
    exchangeRate?: DecimalNullableFilter<"Shipment"> | Decimal | DecimalJsLike | number | string | null
    adAmountUSD?: DecimalNullableFilter<"Shipment"> | Decimal | DecimalJsLike | number | string | null
    tioNumber?: StringNullableFilter<"Shipment"> | string | null
    ferriUSD?: DecimalNullableFilter<"Shipment"> | Decimal | DecimalJsLike | number | string | null
    commUSD?: DecimalNullableFilter<"Shipment"> | Decimal | DecimalJsLike | number | string | null
    totalUSD?: DecimalNullableFilter<"Shipment"> | Decimal | DecimalJsLike | number | string | null
    wellRevenue?: DecimalNullableFilter<"Shipment"> | Decimal | DecimalJsLike | number | string | null
    musungoRevenue?: DecimalNullableFilter<"Shipment"> | Decimal | DecimalJsLike | number | string | null
    ogefremRevenue?: DecimalNullableFilter<"Shipment"> | Decimal | DecimalJsLike | number | string | null
    invoiceDate?: DateTimeNullableFilter<"Shipment"> | Date | string | null
    vesselName?: StringNullableFilter<"Shipment"> | string | null
    entryNumber?: StringNullableFilter<"Shipment"> | string | null
    roeKsh?: DecimalNullableFilter<"Shipment"> | Decimal | DecimalJsLike | number | string | null
    hsCode?: StringNullableFilter<"Shipment"> | string | null
    preparedBy?: StringNullableFilter<"Shipment"> | string | null
    cuInvoiceNumber?: StringNullableFilter<"Shipment"> | string | null
    qrCodeUrl?: StringNullableFilter<"Shipment"> | string | null
    cuDateTime?: DateTimeNullableFilter<"Shipment"> | Date | string | null
    cuSerialNumber?: StringNullableFilter<"Shipment"> | string | null
    customerPin?: StringNullableFilter<"Shipment"> | string | null
    documents?: DocumentListRelationFilter
  }, "id" | "blNumber" | "invoiceNumber">

  export type ShipmentOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    clientName?: SortOrder
    blNumber?: SortOrder
    status?: SortOrder
    containerCount?: SortOrder
    isFeriSkipped?: SortOrder
    feriNumber?: SortOrderInput | SortOrder
    proformaNumber?: SortOrderInput | SortOrder
    proformaAmountEUR?: SortOrderInput | SortOrder
    commissionEUR?: SortOrderInput | SortOrder
    exchangeRate?: SortOrderInput | SortOrder
    adAmountUSD?: SortOrderInput | SortOrder
    tioNumber?: SortOrderInput | SortOrder
    ferriUSD?: SortOrderInput | SortOrder
    commUSD?: SortOrderInput | SortOrder
    totalUSD?: SortOrderInput | SortOrder
    wellRevenue?: SortOrderInput | SortOrder
    musungoRevenue?: SortOrderInput | SortOrder
    ogefremRevenue?: SortOrderInput | SortOrder
    invoiceNumber?: SortOrderInput | SortOrder
    invoiceDate?: SortOrderInput | SortOrder
    vesselName?: SortOrderInput | SortOrder
    entryNumber?: SortOrderInput | SortOrder
    roeKsh?: SortOrderInput | SortOrder
    hsCode?: SortOrderInput | SortOrder
    preparedBy?: SortOrderInput | SortOrder
    cuInvoiceNumber?: SortOrderInput | SortOrder
    qrCodeUrl?: SortOrderInput | SortOrder
    cuDateTime?: SortOrderInput | SortOrder
    cuSerialNumber?: SortOrderInput | SortOrder
    customerPin?: SortOrderInput | SortOrder
    _count?: ShipmentCountOrderByAggregateInput
    _avg?: ShipmentAvgOrderByAggregateInput
    _max?: ShipmentMaxOrderByAggregateInput
    _min?: ShipmentMinOrderByAggregateInput
    _sum?: ShipmentSumOrderByAggregateInput
  }

  export type ShipmentScalarWhereWithAggregatesInput = {
    AND?: ShipmentScalarWhereWithAggregatesInput | ShipmentScalarWhereWithAggregatesInput[]
    OR?: ShipmentScalarWhereWithAggregatesInput[]
    NOT?: ShipmentScalarWhereWithAggregatesInput | ShipmentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Shipment"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Shipment"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Shipment"> | Date | string
    clientName?: StringWithAggregatesFilter<"Shipment"> | string
    blNumber?: StringWithAggregatesFilter<"Shipment"> | string
    status?: EnumShipmentStatusWithAggregatesFilter<"Shipment"> | $Enums.ShipmentStatus
    containerCount?: IntWithAggregatesFilter<"Shipment"> | number
    isFeriSkipped?: BoolWithAggregatesFilter<"Shipment"> | boolean
    feriNumber?: StringNullableWithAggregatesFilter<"Shipment"> | string | null
    proformaNumber?: StringNullableWithAggregatesFilter<"Shipment"> | string | null
    proformaAmountEUR?: DecimalNullableWithAggregatesFilter<"Shipment"> | Decimal | DecimalJsLike | number | string | null
    commissionEUR?: DecimalNullableWithAggregatesFilter<"Shipment"> | Decimal | DecimalJsLike | number | string | null
    exchangeRate?: DecimalNullableWithAggregatesFilter<"Shipment"> | Decimal | DecimalJsLike | number | string | null
    adAmountUSD?: DecimalNullableWithAggregatesFilter<"Shipment"> | Decimal | DecimalJsLike | number | string | null
    tioNumber?: StringNullableWithAggregatesFilter<"Shipment"> | string | null
    ferriUSD?: DecimalNullableWithAggregatesFilter<"Shipment"> | Decimal | DecimalJsLike | number | string | null
    commUSD?: DecimalNullableWithAggregatesFilter<"Shipment"> | Decimal | DecimalJsLike | number | string | null
    totalUSD?: DecimalNullableWithAggregatesFilter<"Shipment"> | Decimal | DecimalJsLike | number | string | null
    wellRevenue?: DecimalNullableWithAggregatesFilter<"Shipment"> | Decimal | DecimalJsLike | number | string | null
    musungoRevenue?: DecimalNullableWithAggregatesFilter<"Shipment"> | Decimal | DecimalJsLike | number | string | null
    ogefremRevenue?: DecimalNullableWithAggregatesFilter<"Shipment"> | Decimal | DecimalJsLike | number | string | null
    invoiceNumber?: StringNullableWithAggregatesFilter<"Shipment"> | string | null
    invoiceDate?: DateTimeNullableWithAggregatesFilter<"Shipment"> | Date | string | null
    vesselName?: StringNullableWithAggregatesFilter<"Shipment"> | string | null
    entryNumber?: StringNullableWithAggregatesFilter<"Shipment"> | string | null
    roeKsh?: DecimalNullableWithAggregatesFilter<"Shipment"> | Decimal | DecimalJsLike | number | string | null
    hsCode?: StringNullableWithAggregatesFilter<"Shipment"> | string | null
    preparedBy?: StringNullableWithAggregatesFilter<"Shipment"> | string | null
    cuInvoiceNumber?: StringNullableWithAggregatesFilter<"Shipment"> | string | null
    qrCodeUrl?: StringNullableWithAggregatesFilter<"Shipment"> | string | null
    cuDateTime?: DateTimeNullableWithAggregatesFilter<"Shipment"> | Date | string | null
    cuSerialNumber?: StringNullableWithAggregatesFilter<"Shipment"> | string | null
    customerPin?: StringNullableWithAggregatesFilter<"Shipment"> | string | null
  }

  export type DocumentWhereInput = {
    AND?: DocumentWhereInput | DocumentWhereInput[]
    OR?: DocumentWhereInput[]
    NOT?: DocumentWhereInput | DocumentWhereInput[]
    id?: StringFilter<"Document"> | string
    createdAt?: DateTimeFilter<"Document"> | Date | string
    updatedAt?: DateTimeFilter<"Document"> | Date | string
    shipmentId?: StringFilter<"Document"> | string
    type?: EnumDocumentTypeFilter<"Document"> | $Enums.DocumentType
    filename?: StringFilter<"Document"> | string
    driveFileId?: StringFilter<"Document"> | string
    driveUrl?: StringFilter<"Document"> | string
    version?: IntFilter<"Document"> | number
    isReplaced?: BoolFilter<"Document"> | boolean
    shipment?: XOR<ShipmentScalarRelationFilter, ShipmentWhereInput>
  }

  export type DocumentOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    shipmentId?: SortOrder
    type?: SortOrder
    filename?: SortOrder
    driveFileId?: SortOrder
    driveUrl?: SortOrder
    version?: SortOrder
    isReplaced?: SortOrder
    shipment?: ShipmentOrderByWithRelationInput
  }

  export type DocumentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: DocumentWhereInput | DocumentWhereInput[]
    OR?: DocumentWhereInput[]
    NOT?: DocumentWhereInput | DocumentWhereInput[]
    createdAt?: DateTimeFilter<"Document"> | Date | string
    updatedAt?: DateTimeFilter<"Document"> | Date | string
    shipmentId?: StringFilter<"Document"> | string
    type?: EnumDocumentTypeFilter<"Document"> | $Enums.DocumentType
    filename?: StringFilter<"Document"> | string
    driveFileId?: StringFilter<"Document"> | string
    driveUrl?: StringFilter<"Document"> | string
    version?: IntFilter<"Document"> | number
    isReplaced?: BoolFilter<"Document"> | boolean
    shipment?: XOR<ShipmentScalarRelationFilter, ShipmentWhereInput>
  }, "id">

  export type DocumentOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    shipmentId?: SortOrder
    type?: SortOrder
    filename?: SortOrder
    driveFileId?: SortOrder
    driveUrl?: SortOrder
    version?: SortOrder
    isReplaced?: SortOrder
    _count?: DocumentCountOrderByAggregateInput
    _avg?: DocumentAvgOrderByAggregateInput
    _max?: DocumentMaxOrderByAggregateInput
    _min?: DocumentMinOrderByAggregateInput
    _sum?: DocumentSumOrderByAggregateInput
  }

  export type DocumentScalarWhereWithAggregatesInput = {
    AND?: DocumentScalarWhereWithAggregatesInput | DocumentScalarWhereWithAggregatesInput[]
    OR?: DocumentScalarWhereWithAggregatesInput[]
    NOT?: DocumentScalarWhereWithAggregatesInput | DocumentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Document"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Document"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Document"> | Date | string
    shipmentId?: StringWithAggregatesFilter<"Document"> | string
    type?: EnumDocumentTypeWithAggregatesFilter<"Document"> | $Enums.DocumentType
    filename?: StringWithAggregatesFilter<"Document"> | string
    driveFileId?: StringWithAggregatesFilter<"Document"> | string
    driveUrl?: StringWithAggregatesFilter<"Document"> | string
    version?: IntWithAggregatesFilter<"Document"> | number
    isReplaced?: BoolWithAggregatesFilter<"Document"> | boolean
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    username?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    role?: StringFilter<"User"> | string
    department?: StringFilter<"User"> | string
    isSuspended?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    resetTokens?: ResetTokenListRelationFilter
    activityLogs?: ActivityLogListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    username?: SortOrder
    password?: SortOrder
    role?: SortOrder
    department?: SortOrder
    isSuspended?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    resetTokens?: ResetTokenOrderByRelationAggregateInput
    activityLogs?: ActivityLogOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    username?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    role?: StringFilter<"User"> | string
    department?: StringFilter<"User"> | string
    isSuspended?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    resetTokens?: ResetTokenListRelationFilter
    activityLogs?: ActivityLogListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    username?: SortOrder
    password?: SortOrder
    role?: SortOrder
    department?: SortOrder
    isSuspended?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    username?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    role?: StringWithAggregatesFilter<"User"> | string
    department?: StringWithAggregatesFilter<"User"> | string
    isSuspended?: BoolWithAggregatesFilter<"User"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type ResetTokenWhereInput = {
    AND?: ResetTokenWhereInput | ResetTokenWhereInput[]
    OR?: ResetTokenWhereInput[]
    NOT?: ResetTokenWhereInput | ResetTokenWhereInput[]
    id?: StringFilter<"ResetToken"> | string
    token?: StringFilter<"ResetToken"> | string
    expires?: DateTimeFilter<"ResetToken"> | Date | string
    createdAt?: DateTimeFilter<"ResetToken"> | Date | string
    userId?: StringFilter<"ResetToken"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type ResetTokenOrderByWithRelationInput = {
    id?: SortOrder
    token?: SortOrder
    expires?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type ResetTokenWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    token?: string
    AND?: ResetTokenWhereInput | ResetTokenWhereInput[]
    OR?: ResetTokenWhereInput[]
    NOT?: ResetTokenWhereInput | ResetTokenWhereInput[]
    expires?: DateTimeFilter<"ResetToken"> | Date | string
    createdAt?: DateTimeFilter<"ResetToken"> | Date | string
    userId?: StringFilter<"ResetToken"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "token">

  export type ResetTokenOrderByWithAggregationInput = {
    id?: SortOrder
    token?: SortOrder
    expires?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    _count?: ResetTokenCountOrderByAggregateInput
    _max?: ResetTokenMaxOrderByAggregateInput
    _min?: ResetTokenMinOrderByAggregateInput
  }

  export type ResetTokenScalarWhereWithAggregatesInput = {
    AND?: ResetTokenScalarWhereWithAggregatesInput | ResetTokenScalarWhereWithAggregatesInput[]
    OR?: ResetTokenScalarWhereWithAggregatesInput[]
    NOT?: ResetTokenScalarWhereWithAggregatesInput | ResetTokenScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ResetToken"> | string
    token?: StringWithAggregatesFilter<"ResetToken"> | string
    expires?: DateTimeWithAggregatesFilter<"ResetToken"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"ResetToken"> | Date | string
    userId?: StringWithAggregatesFilter<"ResetToken"> | string
  }

  export type ActivityLogWhereInput = {
    AND?: ActivityLogWhereInput | ActivityLogWhereInput[]
    OR?: ActivityLogWhereInput[]
    NOT?: ActivityLogWhereInput | ActivityLogWhereInput[]
    id?: StringFilter<"ActivityLog"> | string
    createdAt?: DateTimeFilter<"ActivityLog"> | Date | string
    userId?: StringFilter<"ActivityLog"> | string
    action?: StringFilter<"ActivityLog"> | string
    entity?: StringFilter<"ActivityLog"> | string
    entityId?: StringNullableFilter<"ActivityLog"> | string | null
    detail?: StringNullableFilter<"ActivityLog"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type ActivityLogOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    entity?: SortOrder
    entityId?: SortOrderInput | SortOrder
    detail?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type ActivityLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ActivityLogWhereInput | ActivityLogWhereInput[]
    OR?: ActivityLogWhereInput[]
    NOT?: ActivityLogWhereInput | ActivityLogWhereInput[]
    createdAt?: DateTimeFilter<"ActivityLog"> | Date | string
    userId?: StringFilter<"ActivityLog"> | string
    action?: StringFilter<"ActivityLog"> | string
    entity?: StringFilter<"ActivityLog"> | string
    entityId?: StringNullableFilter<"ActivityLog"> | string | null
    detail?: StringNullableFilter<"ActivityLog"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type ActivityLogOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    entity?: SortOrder
    entityId?: SortOrderInput | SortOrder
    detail?: SortOrderInput | SortOrder
    _count?: ActivityLogCountOrderByAggregateInput
    _max?: ActivityLogMaxOrderByAggregateInput
    _min?: ActivityLogMinOrderByAggregateInput
  }

  export type ActivityLogScalarWhereWithAggregatesInput = {
    AND?: ActivityLogScalarWhereWithAggregatesInput | ActivityLogScalarWhereWithAggregatesInput[]
    OR?: ActivityLogScalarWhereWithAggregatesInput[]
    NOT?: ActivityLogScalarWhereWithAggregatesInput | ActivityLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ActivityLog"> | string
    createdAt?: DateTimeWithAggregatesFilter<"ActivityLog"> | Date | string
    userId?: StringWithAggregatesFilter<"ActivityLog"> | string
    action?: StringWithAggregatesFilter<"ActivityLog"> | string
    entity?: StringWithAggregatesFilter<"ActivityLog"> | string
    entityId?: StringNullableWithAggregatesFilter<"ActivityLog"> | string | null
    detail?: StringNullableWithAggregatesFilter<"ActivityLog"> | string | null
  }

  export type WellShipmentWhereInput = {
    AND?: WellShipmentWhereInput | WellShipmentWhereInput[]
    OR?: WellShipmentWhereInput[]
    NOT?: WellShipmentWhereInput | WellShipmentWhereInput[]
    id?: StringFilter<"WellShipment"> | string
    createdAt?: DateTimeFilter<"WellShipment"> | Date | string
    updatedAt?: DateTimeFilter<"WellShipment"> | Date | string
    refNumber?: StringFilter<"WellShipment"> | string
    clientName?: StringFilter<"WellShipment"> | string
    clientRef?: StringNullableFilter<"WellShipment"> | string | null
    blNumber?: StringFilter<"WellShipment"> | string
    containerSize?: StringFilter<"WellShipment"> | string
    vesselName?: StringNullableFilter<"WellShipment"> | string | null
    eta?: DateTimeNullableFilter<"WellShipment"> | Date | string | null
    status?: EnumWellShipmentStatusFilter<"WellShipment"> | $Enums.WellShipmentStatus
    health?: StringFilter<"WellShipment"> | string
    healthReason?: StringNullableFilter<"WellShipment"> | string | null
    currentStage?: StringNullableFilter<"WellShipment"> | string | null
    assignedOperator?: StringNullableFilter<"WellShipment"> | string | null
    shippingLine?: StringNullableFilter<"WellShipment"> | string | null
    origin?: StringNullableFilter<"WellShipment"> | string | null
    destination?: StringNullableFilter<"WellShipment"> | string | null
    finalDelivery?: StringNullableFilter<"WellShipment"> | string | null
    transporter?: StringNullableFilter<"WellShipment"> | string | null
    docRecv?: StringNullableFilter<"WellShipment"> | string | null
    lodgeCustoms?: DateTimeNullableFilter<"WellShipment"> | Date | string | null
    entryNumber?: StringNullableFilter<"WellShipment"> | string | null
    entryPassed?: DateTimeNullableFilter<"WellShipment"> | Date | string | null
    tblNtbl?: StringNullableFilter<"WellShipment"> | string | null
    slineCharges?: DateTimeNullableFilter<"WellShipment"> | Date | string | null
    slinePaid?: DateTimeNullableFilter<"WellShipment"> | Date | string | null
    ddRecv?: DateTimeNullableFilter<"WellShipment"> | Date | string | null
    lastSlingCfs?: StringNullableFilter<"WellShipment"> | string | null
    lodgedKpa?: DateTimeNullableFilter<"WellShipment"> | Date | string | null
    dateVerified?: DateTimeNullableFilter<"WellShipment"> | Date | string | null
    isPaid?: BoolFilter<"WellShipment"> | boolean
    paidAt?: DateTimeNullableFilter<"WellShipment"> | Date | string | null
    amount?: DecimalNullableFilter<"WellShipment"> | Decimal | DecimalJsLike | number | string | null
    roeKsh?: DecimalNullableFilter<"WellShipment"> | Decimal | DecimalJsLike | number | string | null
    invoiceDate?: DateTimeNullableFilter<"WellShipment"> | Date | string | null
    notes?: StringNullableFilter<"WellShipment"> | string | null
    documents?: WellDocumentListRelationFilter
    containers?: WellContainerListRelationFilter
    events?: WellEventListRelationFilter
    exceptions?: WellExceptionListRelationFilter
    notesHistory?: WellShipmentNoteListRelationFilter
  }

  export type WellShipmentOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    refNumber?: SortOrder
    clientName?: SortOrder
    clientRef?: SortOrderInput | SortOrder
    blNumber?: SortOrder
    containerSize?: SortOrder
    vesselName?: SortOrderInput | SortOrder
    eta?: SortOrderInput | SortOrder
    status?: SortOrder
    health?: SortOrder
    healthReason?: SortOrderInput | SortOrder
    currentStage?: SortOrderInput | SortOrder
    assignedOperator?: SortOrderInput | SortOrder
    shippingLine?: SortOrderInput | SortOrder
    origin?: SortOrderInput | SortOrder
    destination?: SortOrderInput | SortOrder
    finalDelivery?: SortOrderInput | SortOrder
    transporter?: SortOrderInput | SortOrder
    docRecv?: SortOrderInput | SortOrder
    lodgeCustoms?: SortOrderInput | SortOrder
    entryNumber?: SortOrderInput | SortOrder
    entryPassed?: SortOrderInput | SortOrder
    tblNtbl?: SortOrderInput | SortOrder
    slineCharges?: SortOrderInput | SortOrder
    slinePaid?: SortOrderInput | SortOrder
    ddRecv?: SortOrderInput | SortOrder
    lastSlingCfs?: SortOrderInput | SortOrder
    lodgedKpa?: SortOrderInput | SortOrder
    dateVerified?: SortOrderInput | SortOrder
    isPaid?: SortOrder
    paidAt?: SortOrderInput | SortOrder
    amount?: SortOrderInput | SortOrder
    roeKsh?: SortOrderInput | SortOrder
    invoiceDate?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    documents?: WellDocumentOrderByRelationAggregateInput
    containers?: WellContainerOrderByRelationAggregateInput
    events?: WellEventOrderByRelationAggregateInput
    exceptions?: WellExceptionOrderByRelationAggregateInput
    notesHistory?: WellShipmentNoteOrderByRelationAggregateInput
  }

  export type WellShipmentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    refNumber?: string
    AND?: WellShipmentWhereInput | WellShipmentWhereInput[]
    OR?: WellShipmentWhereInput[]
    NOT?: WellShipmentWhereInput | WellShipmentWhereInput[]
    createdAt?: DateTimeFilter<"WellShipment"> | Date | string
    updatedAt?: DateTimeFilter<"WellShipment"> | Date | string
    clientName?: StringFilter<"WellShipment"> | string
    clientRef?: StringNullableFilter<"WellShipment"> | string | null
    blNumber?: StringFilter<"WellShipment"> | string
    containerSize?: StringFilter<"WellShipment"> | string
    vesselName?: StringNullableFilter<"WellShipment"> | string | null
    eta?: DateTimeNullableFilter<"WellShipment"> | Date | string | null
    status?: EnumWellShipmentStatusFilter<"WellShipment"> | $Enums.WellShipmentStatus
    health?: StringFilter<"WellShipment"> | string
    healthReason?: StringNullableFilter<"WellShipment"> | string | null
    currentStage?: StringNullableFilter<"WellShipment"> | string | null
    assignedOperator?: StringNullableFilter<"WellShipment"> | string | null
    shippingLine?: StringNullableFilter<"WellShipment"> | string | null
    origin?: StringNullableFilter<"WellShipment"> | string | null
    destination?: StringNullableFilter<"WellShipment"> | string | null
    finalDelivery?: StringNullableFilter<"WellShipment"> | string | null
    transporter?: StringNullableFilter<"WellShipment"> | string | null
    docRecv?: StringNullableFilter<"WellShipment"> | string | null
    lodgeCustoms?: DateTimeNullableFilter<"WellShipment"> | Date | string | null
    entryNumber?: StringNullableFilter<"WellShipment"> | string | null
    entryPassed?: DateTimeNullableFilter<"WellShipment"> | Date | string | null
    tblNtbl?: StringNullableFilter<"WellShipment"> | string | null
    slineCharges?: DateTimeNullableFilter<"WellShipment"> | Date | string | null
    slinePaid?: DateTimeNullableFilter<"WellShipment"> | Date | string | null
    ddRecv?: DateTimeNullableFilter<"WellShipment"> | Date | string | null
    lastSlingCfs?: StringNullableFilter<"WellShipment"> | string | null
    lodgedKpa?: DateTimeNullableFilter<"WellShipment"> | Date | string | null
    dateVerified?: DateTimeNullableFilter<"WellShipment"> | Date | string | null
    isPaid?: BoolFilter<"WellShipment"> | boolean
    paidAt?: DateTimeNullableFilter<"WellShipment"> | Date | string | null
    amount?: DecimalNullableFilter<"WellShipment"> | Decimal | DecimalJsLike | number | string | null
    roeKsh?: DecimalNullableFilter<"WellShipment"> | Decimal | DecimalJsLike | number | string | null
    invoiceDate?: DateTimeNullableFilter<"WellShipment"> | Date | string | null
    notes?: StringNullableFilter<"WellShipment"> | string | null
    documents?: WellDocumentListRelationFilter
    containers?: WellContainerListRelationFilter
    events?: WellEventListRelationFilter
    exceptions?: WellExceptionListRelationFilter
    notesHistory?: WellShipmentNoteListRelationFilter
  }, "id" | "refNumber">

  export type WellShipmentOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    refNumber?: SortOrder
    clientName?: SortOrder
    clientRef?: SortOrderInput | SortOrder
    blNumber?: SortOrder
    containerSize?: SortOrder
    vesselName?: SortOrderInput | SortOrder
    eta?: SortOrderInput | SortOrder
    status?: SortOrder
    health?: SortOrder
    healthReason?: SortOrderInput | SortOrder
    currentStage?: SortOrderInput | SortOrder
    assignedOperator?: SortOrderInput | SortOrder
    shippingLine?: SortOrderInput | SortOrder
    origin?: SortOrderInput | SortOrder
    destination?: SortOrderInput | SortOrder
    finalDelivery?: SortOrderInput | SortOrder
    transporter?: SortOrderInput | SortOrder
    docRecv?: SortOrderInput | SortOrder
    lodgeCustoms?: SortOrderInput | SortOrder
    entryNumber?: SortOrderInput | SortOrder
    entryPassed?: SortOrderInput | SortOrder
    tblNtbl?: SortOrderInput | SortOrder
    slineCharges?: SortOrderInput | SortOrder
    slinePaid?: SortOrderInput | SortOrder
    ddRecv?: SortOrderInput | SortOrder
    lastSlingCfs?: SortOrderInput | SortOrder
    lodgedKpa?: SortOrderInput | SortOrder
    dateVerified?: SortOrderInput | SortOrder
    isPaid?: SortOrder
    paidAt?: SortOrderInput | SortOrder
    amount?: SortOrderInput | SortOrder
    roeKsh?: SortOrderInput | SortOrder
    invoiceDate?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    _count?: WellShipmentCountOrderByAggregateInput
    _avg?: WellShipmentAvgOrderByAggregateInput
    _max?: WellShipmentMaxOrderByAggregateInput
    _min?: WellShipmentMinOrderByAggregateInput
    _sum?: WellShipmentSumOrderByAggregateInput
  }

  export type WellShipmentScalarWhereWithAggregatesInput = {
    AND?: WellShipmentScalarWhereWithAggregatesInput | WellShipmentScalarWhereWithAggregatesInput[]
    OR?: WellShipmentScalarWhereWithAggregatesInput[]
    NOT?: WellShipmentScalarWhereWithAggregatesInput | WellShipmentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"WellShipment"> | string
    createdAt?: DateTimeWithAggregatesFilter<"WellShipment"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"WellShipment"> | Date | string
    refNumber?: StringWithAggregatesFilter<"WellShipment"> | string
    clientName?: StringWithAggregatesFilter<"WellShipment"> | string
    clientRef?: StringNullableWithAggregatesFilter<"WellShipment"> | string | null
    blNumber?: StringWithAggregatesFilter<"WellShipment"> | string
    containerSize?: StringWithAggregatesFilter<"WellShipment"> | string
    vesselName?: StringNullableWithAggregatesFilter<"WellShipment"> | string | null
    eta?: DateTimeNullableWithAggregatesFilter<"WellShipment"> | Date | string | null
    status?: EnumWellShipmentStatusWithAggregatesFilter<"WellShipment"> | $Enums.WellShipmentStatus
    health?: StringWithAggregatesFilter<"WellShipment"> | string
    healthReason?: StringNullableWithAggregatesFilter<"WellShipment"> | string | null
    currentStage?: StringNullableWithAggregatesFilter<"WellShipment"> | string | null
    assignedOperator?: StringNullableWithAggregatesFilter<"WellShipment"> | string | null
    shippingLine?: StringNullableWithAggregatesFilter<"WellShipment"> | string | null
    origin?: StringNullableWithAggregatesFilter<"WellShipment"> | string | null
    destination?: StringNullableWithAggregatesFilter<"WellShipment"> | string | null
    finalDelivery?: StringNullableWithAggregatesFilter<"WellShipment"> | string | null
    transporter?: StringNullableWithAggregatesFilter<"WellShipment"> | string | null
    docRecv?: StringNullableWithAggregatesFilter<"WellShipment"> | string | null
    lodgeCustoms?: DateTimeNullableWithAggregatesFilter<"WellShipment"> | Date | string | null
    entryNumber?: StringNullableWithAggregatesFilter<"WellShipment"> | string | null
    entryPassed?: DateTimeNullableWithAggregatesFilter<"WellShipment"> | Date | string | null
    tblNtbl?: StringNullableWithAggregatesFilter<"WellShipment"> | string | null
    slineCharges?: DateTimeNullableWithAggregatesFilter<"WellShipment"> | Date | string | null
    slinePaid?: DateTimeNullableWithAggregatesFilter<"WellShipment"> | Date | string | null
    ddRecv?: DateTimeNullableWithAggregatesFilter<"WellShipment"> | Date | string | null
    lastSlingCfs?: StringNullableWithAggregatesFilter<"WellShipment"> | string | null
    lodgedKpa?: DateTimeNullableWithAggregatesFilter<"WellShipment"> | Date | string | null
    dateVerified?: DateTimeNullableWithAggregatesFilter<"WellShipment"> | Date | string | null
    isPaid?: BoolWithAggregatesFilter<"WellShipment"> | boolean
    paidAt?: DateTimeNullableWithAggregatesFilter<"WellShipment"> | Date | string | null
    amount?: DecimalNullableWithAggregatesFilter<"WellShipment"> | Decimal | DecimalJsLike | number | string | null
    roeKsh?: DecimalNullableWithAggregatesFilter<"WellShipment"> | Decimal | DecimalJsLike | number | string | null
    invoiceDate?: DateTimeNullableWithAggregatesFilter<"WellShipment"> | Date | string | null
    notes?: StringNullableWithAggregatesFilter<"WellShipment"> | string | null
  }

  export type WellEventWhereInput = {
    AND?: WellEventWhereInput | WellEventWhereInput[]
    OR?: WellEventWhereInput[]
    NOT?: WellEventWhereInput | WellEventWhereInput[]
    id?: StringFilter<"WellEvent"> | string
    shipmentId?: StringFilter<"WellEvent"> | string
    title?: StringFilter<"WellEvent"> | string
    description?: StringNullableFilter<"WellEvent"> | string | null
    stage?: StringNullableFilter<"WellEvent"> | string | null
    source?: StringFilter<"WellEvent"> | string
    updatedBy?: StringFilter<"WellEvent"> | string
    reference?: StringNullableFilter<"WellEvent"> | string | null
    createdAt?: DateTimeFilter<"WellEvent"> | Date | string
    shipment?: XOR<WellShipmentScalarRelationFilter, WellShipmentWhereInput>
  }

  export type WellEventOrderByWithRelationInput = {
    id?: SortOrder
    shipmentId?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    stage?: SortOrderInput | SortOrder
    source?: SortOrder
    updatedBy?: SortOrder
    reference?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    shipment?: WellShipmentOrderByWithRelationInput
  }

  export type WellEventWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: WellEventWhereInput | WellEventWhereInput[]
    OR?: WellEventWhereInput[]
    NOT?: WellEventWhereInput | WellEventWhereInput[]
    shipmentId?: StringFilter<"WellEvent"> | string
    title?: StringFilter<"WellEvent"> | string
    description?: StringNullableFilter<"WellEvent"> | string | null
    stage?: StringNullableFilter<"WellEvent"> | string | null
    source?: StringFilter<"WellEvent"> | string
    updatedBy?: StringFilter<"WellEvent"> | string
    reference?: StringNullableFilter<"WellEvent"> | string | null
    createdAt?: DateTimeFilter<"WellEvent"> | Date | string
    shipment?: XOR<WellShipmentScalarRelationFilter, WellShipmentWhereInput>
  }, "id">

  export type WellEventOrderByWithAggregationInput = {
    id?: SortOrder
    shipmentId?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    stage?: SortOrderInput | SortOrder
    source?: SortOrder
    updatedBy?: SortOrder
    reference?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: WellEventCountOrderByAggregateInput
    _max?: WellEventMaxOrderByAggregateInput
    _min?: WellEventMinOrderByAggregateInput
  }

  export type WellEventScalarWhereWithAggregatesInput = {
    AND?: WellEventScalarWhereWithAggregatesInput | WellEventScalarWhereWithAggregatesInput[]
    OR?: WellEventScalarWhereWithAggregatesInput[]
    NOT?: WellEventScalarWhereWithAggregatesInput | WellEventScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"WellEvent"> | string
    shipmentId?: StringWithAggregatesFilter<"WellEvent"> | string
    title?: StringWithAggregatesFilter<"WellEvent"> | string
    description?: StringNullableWithAggregatesFilter<"WellEvent"> | string | null
    stage?: StringNullableWithAggregatesFilter<"WellEvent"> | string | null
    source?: StringWithAggregatesFilter<"WellEvent"> | string
    updatedBy?: StringWithAggregatesFilter<"WellEvent"> | string
    reference?: StringNullableWithAggregatesFilter<"WellEvent"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"WellEvent"> | Date | string
  }

  export type WellExceptionWhereInput = {
    AND?: WellExceptionWhereInput | WellExceptionWhereInput[]
    OR?: WellExceptionWhereInput[]
    NOT?: WellExceptionWhereInput | WellExceptionWhereInput[]
    id?: StringFilter<"WellException"> | string
    shipmentId?: StringFilter<"WellException"> | string
    containerId?: StringNullableFilter<"WellException"> | string | null
    issueType?: StringFilter<"WellException"> | string
    severity?: StringFilter<"WellException"> | string
    status?: StringFilter<"WellException"> | string
    description?: StringFilter<"WellException"> | string
    expectedResolution?: StringNullableFilter<"WellException"> | string | null
    assignedTo?: StringNullableFilter<"WellException"> | string | null
    dueDate?: DateTimeNullableFilter<"WellException"> | Date | string | null
    createdBy?: StringFilter<"WellException"> | string
    createdAt?: DateTimeFilter<"WellException"> | Date | string
    resolvedAt?: DateTimeNullableFilter<"WellException"> | Date | string | null
    resolvedBy?: StringNullableFilter<"WellException"> | string | null
    shipment?: XOR<WellShipmentScalarRelationFilter, WellShipmentWhereInput>
  }

  export type WellExceptionOrderByWithRelationInput = {
    id?: SortOrder
    shipmentId?: SortOrder
    containerId?: SortOrderInput | SortOrder
    issueType?: SortOrder
    severity?: SortOrder
    status?: SortOrder
    description?: SortOrder
    expectedResolution?: SortOrderInput | SortOrder
    assignedTo?: SortOrderInput | SortOrder
    dueDate?: SortOrderInput | SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    resolvedAt?: SortOrderInput | SortOrder
    resolvedBy?: SortOrderInput | SortOrder
    shipment?: WellShipmentOrderByWithRelationInput
  }

  export type WellExceptionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: WellExceptionWhereInput | WellExceptionWhereInput[]
    OR?: WellExceptionWhereInput[]
    NOT?: WellExceptionWhereInput | WellExceptionWhereInput[]
    shipmentId?: StringFilter<"WellException"> | string
    containerId?: StringNullableFilter<"WellException"> | string | null
    issueType?: StringFilter<"WellException"> | string
    severity?: StringFilter<"WellException"> | string
    status?: StringFilter<"WellException"> | string
    description?: StringFilter<"WellException"> | string
    expectedResolution?: StringNullableFilter<"WellException"> | string | null
    assignedTo?: StringNullableFilter<"WellException"> | string | null
    dueDate?: DateTimeNullableFilter<"WellException"> | Date | string | null
    createdBy?: StringFilter<"WellException"> | string
    createdAt?: DateTimeFilter<"WellException"> | Date | string
    resolvedAt?: DateTimeNullableFilter<"WellException"> | Date | string | null
    resolvedBy?: StringNullableFilter<"WellException"> | string | null
    shipment?: XOR<WellShipmentScalarRelationFilter, WellShipmentWhereInput>
  }, "id">

  export type WellExceptionOrderByWithAggregationInput = {
    id?: SortOrder
    shipmentId?: SortOrder
    containerId?: SortOrderInput | SortOrder
    issueType?: SortOrder
    severity?: SortOrder
    status?: SortOrder
    description?: SortOrder
    expectedResolution?: SortOrderInput | SortOrder
    assignedTo?: SortOrderInput | SortOrder
    dueDate?: SortOrderInput | SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    resolvedAt?: SortOrderInput | SortOrder
    resolvedBy?: SortOrderInput | SortOrder
    _count?: WellExceptionCountOrderByAggregateInput
    _max?: WellExceptionMaxOrderByAggregateInput
    _min?: WellExceptionMinOrderByAggregateInput
  }

  export type WellExceptionScalarWhereWithAggregatesInput = {
    AND?: WellExceptionScalarWhereWithAggregatesInput | WellExceptionScalarWhereWithAggregatesInput[]
    OR?: WellExceptionScalarWhereWithAggregatesInput[]
    NOT?: WellExceptionScalarWhereWithAggregatesInput | WellExceptionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"WellException"> | string
    shipmentId?: StringWithAggregatesFilter<"WellException"> | string
    containerId?: StringNullableWithAggregatesFilter<"WellException"> | string | null
    issueType?: StringWithAggregatesFilter<"WellException"> | string
    severity?: StringWithAggregatesFilter<"WellException"> | string
    status?: StringWithAggregatesFilter<"WellException"> | string
    description?: StringWithAggregatesFilter<"WellException"> | string
    expectedResolution?: StringNullableWithAggregatesFilter<"WellException"> | string | null
    assignedTo?: StringNullableWithAggregatesFilter<"WellException"> | string | null
    dueDate?: DateTimeNullableWithAggregatesFilter<"WellException"> | Date | string | null
    createdBy?: StringWithAggregatesFilter<"WellException"> | string
    createdAt?: DateTimeWithAggregatesFilter<"WellException"> | Date | string
    resolvedAt?: DateTimeNullableWithAggregatesFilter<"WellException"> | Date | string | null
    resolvedBy?: StringNullableWithAggregatesFilter<"WellException"> | string | null
  }

  export type WellContainerWhereInput = {
    AND?: WellContainerWhereInput | WellContainerWhereInput[]
    OR?: WellContainerWhereInput[]
    NOT?: WellContainerWhereInput | WellContainerWhereInput[]
    id?: StringFilter<"WellContainer"> | string
    shipmentId?: StringFilter<"WellContainer"> | string
    containerNumber?: StringFilter<"WellContainer"> | string
    size?: StringNullableFilter<"WellContainer"> | string | null
    weight?: FloatNullableFilter<"WellContainer"> | number | null
    dischargeDate?: DateTimeNullableFilter<"WellContainer"> | Date | string | null
    gateOutDate?: DateTimeNullableFilter<"WellContainer"> | Date | string | null
    truckDetails?: StringNullableFilter<"WellContainer"> | string | null
    driverName?: StringNullableFilter<"WellContainer"> | string | null
    status?: StringNullableFilter<"WellContainer"> | string | null
    remarks?: StringNullableFilter<"WellContainer"> | string | null
    createdAt?: DateTimeFilter<"WellContainer"> | Date | string
    updatedAt?: DateTimeFilter<"WellContainer"> | Date | string
    shipment?: XOR<WellShipmentScalarRelationFilter, WellShipmentWhereInput>
  }

  export type WellContainerOrderByWithRelationInput = {
    id?: SortOrder
    shipmentId?: SortOrder
    containerNumber?: SortOrder
    size?: SortOrderInput | SortOrder
    weight?: SortOrderInput | SortOrder
    dischargeDate?: SortOrderInput | SortOrder
    gateOutDate?: SortOrderInput | SortOrder
    truckDetails?: SortOrderInput | SortOrder
    driverName?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    remarks?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    shipment?: WellShipmentOrderByWithRelationInput
  }

  export type WellContainerWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: WellContainerWhereInput | WellContainerWhereInput[]
    OR?: WellContainerWhereInput[]
    NOT?: WellContainerWhereInput | WellContainerWhereInput[]
    shipmentId?: StringFilter<"WellContainer"> | string
    containerNumber?: StringFilter<"WellContainer"> | string
    size?: StringNullableFilter<"WellContainer"> | string | null
    weight?: FloatNullableFilter<"WellContainer"> | number | null
    dischargeDate?: DateTimeNullableFilter<"WellContainer"> | Date | string | null
    gateOutDate?: DateTimeNullableFilter<"WellContainer"> | Date | string | null
    truckDetails?: StringNullableFilter<"WellContainer"> | string | null
    driverName?: StringNullableFilter<"WellContainer"> | string | null
    status?: StringNullableFilter<"WellContainer"> | string | null
    remarks?: StringNullableFilter<"WellContainer"> | string | null
    createdAt?: DateTimeFilter<"WellContainer"> | Date | string
    updatedAt?: DateTimeFilter<"WellContainer"> | Date | string
    shipment?: XOR<WellShipmentScalarRelationFilter, WellShipmentWhereInput>
  }, "id">

  export type WellContainerOrderByWithAggregationInput = {
    id?: SortOrder
    shipmentId?: SortOrder
    containerNumber?: SortOrder
    size?: SortOrderInput | SortOrder
    weight?: SortOrderInput | SortOrder
    dischargeDate?: SortOrderInput | SortOrder
    gateOutDate?: SortOrderInput | SortOrder
    truckDetails?: SortOrderInput | SortOrder
    driverName?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    remarks?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: WellContainerCountOrderByAggregateInput
    _avg?: WellContainerAvgOrderByAggregateInput
    _max?: WellContainerMaxOrderByAggregateInput
    _min?: WellContainerMinOrderByAggregateInput
    _sum?: WellContainerSumOrderByAggregateInput
  }

  export type WellContainerScalarWhereWithAggregatesInput = {
    AND?: WellContainerScalarWhereWithAggregatesInput | WellContainerScalarWhereWithAggregatesInput[]
    OR?: WellContainerScalarWhereWithAggregatesInput[]
    NOT?: WellContainerScalarWhereWithAggregatesInput | WellContainerScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"WellContainer"> | string
    shipmentId?: StringWithAggregatesFilter<"WellContainer"> | string
    containerNumber?: StringWithAggregatesFilter<"WellContainer"> | string
    size?: StringNullableWithAggregatesFilter<"WellContainer"> | string | null
    weight?: FloatNullableWithAggregatesFilter<"WellContainer"> | number | null
    dischargeDate?: DateTimeNullableWithAggregatesFilter<"WellContainer"> | Date | string | null
    gateOutDate?: DateTimeNullableWithAggregatesFilter<"WellContainer"> | Date | string | null
    truckDetails?: StringNullableWithAggregatesFilter<"WellContainer"> | string | null
    driverName?: StringNullableWithAggregatesFilter<"WellContainer"> | string | null
    status?: StringNullableWithAggregatesFilter<"WellContainer"> | string | null
    remarks?: StringNullableWithAggregatesFilter<"WellContainer"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"WellContainer"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"WellContainer"> | Date | string
  }

  export type WellDocumentWhereInput = {
    AND?: WellDocumentWhereInput | WellDocumentWhereInput[]
    OR?: WellDocumentWhereInput[]
    NOT?: WellDocumentWhereInput | WellDocumentWhereInput[]
    id?: StringFilter<"WellDocument"> | string
    createdAt?: DateTimeFilter<"WellDocument"> | Date | string
    updatedAt?: DateTimeFilter<"WellDocument"> | Date | string
    shipmentId?: StringFilter<"WellDocument"> | string
    filename?: StringFilter<"WellDocument"> | string
    driveFileId?: StringFilter<"WellDocument"> | string
    driveUrl?: StringFilter<"WellDocument"> | string
    docType?: StringFilter<"WellDocument"> | string
    shipment?: XOR<WellShipmentScalarRelationFilter, WellShipmentWhereInput>
  }

  export type WellDocumentOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    shipmentId?: SortOrder
    filename?: SortOrder
    driveFileId?: SortOrder
    driveUrl?: SortOrder
    docType?: SortOrder
    shipment?: WellShipmentOrderByWithRelationInput
  }

  export type WellDocumentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: WellDocumentWhereInput | WellDocumentWhereInput[]
    OR?: WellDocumentWhereInput[]
    NOT?: WellDocumentWhereInput | WellDocumentWhereInput[]
    createdAt?: DateTimeFilter<"WellDocument"> | Date | string
    updatedAt?: DateTimeFilter<"WellDocument"> | Date | string
    shipmentId?: StringFilter<"WellDocument"> | string
    filename?: StringFilter<"WellDocument"> | string
    driveFileId?: StringFilter<"WellDocument"> | string
    driveUrl?: StringFilter<"WellDocument"> | string
    docType?: StringFilter<"WellDocument"> | string
    shipment?: XOR<WellShipmentScalarRelationFilter, WellShipmentWhereInput>
  }, "id">

  export type WellDocumentOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    shipmentId?: SortOrder
    filename?: SortOrder
    driveFileId?: SortOrder
    driveUrl?: SortOrder
    docType?: SortOrder
    _count?: WellDocumentCountOrderByAggregateInput
    _max?: WellDocumentMaxOrderByAggregateInput
    _min?: WellDocumentMinOrderByAggregateInput
  }

  export type WellDocumentScalarWhereWithAggregatesInput = {
    AND?: WellDocumentScalarWhereWithAggregatesInput | WellDocumentScalarWhereWithAggregatesInput[]
    OR?: WellDocumentScalarWhereWithAggregatesInput[]
    NOT?: WellDocumentScalarWhereWithAggregatesInput | WellDocumentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"WellDocument"> | string
    createdAt?: DateTimeWithAggregatesFilter<"WellDocument"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"WellDocument"> | Date | string
    shipmentId?: StringWithAggregatesFilter<"WellDocument"> | string
    filename?: StringWithAggregatesFilter<"WellDocument"> | string
    driveFileId?: StringWithAggregatesFilter<"WellDocument"> | string
    driveUrl?: StringWithAggregatesFilter<"WellDocument"> | string
    docType?: StringWithAggregatesFilter<"WellDocument"> | string
  }

  export type WellRefCounterWhereInput = {
    AND?: WellRefCounterWhereInput | WellRefCounterWhereInput[]
    OR?: WellRefCounterWhereInput[]
    NOT?: WellRefCounterWhereInput | WellRefCounterWhereInput[]
    id?: IntFilter<"WellRefCounter"> | number
    lastRef?: IntFilter<"WellRefCounter"> | number
  }

  export type WellRefCounterOrderByWithRelationInput = {
    id?: SortOrder
    lastRef?: SortOrder
  }

  export type WellRefCounterWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: WellRefCounterWhereInput | WellRefCounterWhereInput[]
    OR?: WellRefCounterWhereInput[]
    NOT?: WellRefCounterWhereInput | WellRefCounterWhereInput[]
    lastRef?: IntFilter<"WellRefCounter"> | number
  }, "id">

  export type WellRefCounterOrderByWithAggregationInput = {
    id?: SortOrder
    lastRef?: SortOrder
    _count?: WellRefCounterCountOrderByAggregateInput
    _avg?: WellRefCounterAvgOrderByAggregateInput
    _max?: WellRefCounterMaxOrderByAggregateInput
    _min?: WellRefCounterMinOrderByAggregateInput
    _sum?: WellRefCounterSumOrderByAggregateInput
  }

  export type WellRefCounterScalarWhereWithAggregatesInput = {
    AND?: WellRefCounterScalarWhereWithAggregatesInput | WellRefCounterScalarWhereWithAggregatesInput[]
    OR?: WellRefCounterScalarWhereWithAggregatesInput[]
    NOT?: WellRefCounterScalarWhereWithAggregatesInput | WellRefCounterScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"WellRefCounter"> | number
    lastRef?: IntWithAggregatesFilter<"WellRefCounter"> | number
  }

  export type WellShipmentNoteWhereInput = {
    AND?: WellShipmentNoteWhereInput | WellShipmentNoteWhereInput[]
    OR?: WellShipmentNoteWhereInput[]
    NOT?: WellShipmentNoteWhereInput | WellShipmentNoteWhereInput[]
    id?: StringFilter<"WellShipmentNote"> | string
    shipmentId?: StringFilter<"WellShipmentNote"> | string
    note?: StringFilter<"WellShipmentNote"> | string
    createdBy?: StringFilter<"WellShipmentNote"> | string
    createdAt?: DateTimeFilter<"WellShipmentNote"> | Date | string
    updatedAt?: DateTimeFilter<"WellShipmentNote"> | Date | string
    shipment?: XOR<WellShipmentScalarRelationFilter, WellShipmentWhereInput>
  }

  export type WellShipmentNoteOrderByWithRelationInput = {
    id?: SortOrder
    shipmentId?: SortOrder
    note?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    shipment?: WellShipmentOrderByWithRelationInput
  }

  export type WellShipmentNoteWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: WellShipmentNoteWhereInput | WellShipmentNoteWhereInput[]
    OR?: WellShipmentNoteWhereInput[]
    NOT?: WellShipmentNoteWhereInput | WellShipmentNoteWhereInput[]
    shipmentId?: StringFilter<"WellShipmentNote"> | string
    note?: StringFilter<"WellShipmentNote"> | string
    createdBy?: StringFilter<"WellShipmentNote"> | string
    createdAt?: DateTimeFilter<"WellShipmentNote"> | Date | string
    updatedAt?: DateTimeFilter<"WellShipmentNote"> | Date | string
    shipment?: XOR<WellShipmentScalarRelationFilter, WellShipmentWhereInput>
  }, "id">

  export type WellShipmentNoteOrderByWithAggregationInput = {
    id?: SortOrder
    shipmentId?: SortOrder
    note?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: WellShipmentNoteCountOrderByAggregateInput
    _max?: WellShipmentNoteMaxOrderByAggregateInput
    _min?: WellShipmentNoteMinOrderByAggregateInput
  }

  export type WellShipmentNoteScalarWhereWithAggregatesInput = {
    AND?: WellShipmentNoteScalarWhereWithAggregatesInput | WellShipmentNoteScalarWhereWithAggregatesInput[]
    OR?: WellShipmentNoteScalarWhereWithAggregatesInput[]
    NOT?: WellShipmentNoteScalarWhereWithAggregatesInput | WellShipmentNoteScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"WellShipmentNote"> | string
    shipmentId?: StringWithAggregatesFilter<"WellShipmentNote"> | string
    note?: StringWithAggregatesFilter<"WellShipmentNote"> | string
    createdBy?: StringWithAggregatesFilter<"WellShipmentNote"> | string
    createdAt?: DateTimeWithAggregatesFilter<"WellShipmentNote"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"WellShipmentNote"> | Date | string
  }

  export type ShipmentCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    clientName: string
    blNumber: string
    status?: $Enums.ShipmentStatus
    containerCount?: number
    isFeriSkipped?: boolean
    feriNumber?: string | null
    proformaNumber?: string | null
    proformaAmountEUR?: Decimal | DecimalJsLike | number | string | null
    commissionEUR?: Decimal | DecimalJsLike | number | string | null
    exchangeRate?: Decimal | DecimalJsLike | number | string | null
    adAmountUSD?: Decimal | DecimalJsLike | number | string | null
    tioNumber?: string | null
    ferriUSD?: Decimal | DecimalJsLike | number | string | null
    commUSD?: Decimal | DecimalJsLike | number | string | null
    totalUSD?: Decimal | DecimalJsLike | number | string | null
    wellRevenue?: Decimal | DecimalJsLike | number | string | null
    musungoRevenue?: Decimal | DecimalJsLike | number | string | null
    ogefremRevenue?: Decimal | DecimalJsLike | number | string | null
    invoiceNumber?: string | null
    invoiceDate?: Date | string | null
    vesselName?: string | null
    entryNumber?: string | null
    roeKsh?: Decimal | DecimalJsLike | number | string | null
    hsCode?: string | null
    preparedBy?: string | null
    cuInvoiceNumber?: string | null
    qrCodeUrl?: string | null
    cuDateTime?: Date | string | null
    cuSerialNumber?: string | null
    customerPin?: string | null
    documents?: DocumentCreateNestedManyWithoutShipmentInput
  }

  export type ShipmentUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    clientName: string
    blNumber: string
    status?: $Enums.ShipmentStatus
    containerCount?: number
    isFeriSkipped?: boolean
    feriNumber?: string | null
    proformaNumber?: string | null
    proformaAmountEUR?: Decimal | DecimalJsLike | number | string | null
    commissionEUR?: Decimal | DecimalJsLike | number | string | null
    exchangeRate?: Decimal | DecimalJsLike | number | string | null
    adAmountUSD?: Decimal | DecimalJsLike | number | string | null
    tioNumber?: string | null
    ferriUSD?: Decimal | DecimalJsLike | number | string | null
    commUSD?: Decimal | DecimalJsLike | number | string | null
    totalUSD?: Decimal | DecimalJsLike | number | string | null
    wellRevenue?: Decimal | DecimalJsLike | number | string | null
    musungoRevenue?: Decimal | DecimalJsLike | number | string | null
    ogefremRevenue?: Decimal | DecimalJsLike | number | string | null
    invoiceNumber?: string | null
    invoiceDate?: Date | string | null
    vesselName?: string | null
    entryNumber?: string | null
    roeKsh?: Decimal | DecimalJsLike | number | string | null
    hsCode?: string | null
    preparedBy?: string | null
    cuInvoiceNumber?: string | null
    qrCodeUrl?: string | null
    cuDateTime?: Date | string | null
    cuSerialNumber?: string | null
    customerPin?: string | null
    documents?: DocumentUncheckedCreateNestedManyWithoutShipmentInput
  }

  export type ShipmentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clientName?: StringFieldUpdateOperationsInput | string
    blNumber?: StringFieldUpdateOperationsInput | string
    status?: EnumShipmentStatusFieldUpdateOperationsInput | $Enums.ShipmentStatus
    containerCount?: IntFieldUpdateOperationsInput | number
    isFeriSkipped?: BoolFieldUpdateOperationsInput | boolean
    feriNumber?: NullableStringFieldUpdateOperationsInput | string | null
    proformaNumber?: NullableStringFieldUpdateOperationsInput | string | null
    proformaAmountEUR?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    commissionEUR?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    exchangeRate?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    adAmountUSD?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    tioNumber?: NullableStringFieldUpdateOperationsInput | string | null
    ferriUSD?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    commUSD?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    totalUSD?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    wellRevenue?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    musungoRevenue?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    ogefremRevenue?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    invoiceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    invoiceDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    vesselName?: NullableStringFieldUpdateOperationsInput | string | null
    entryNumber?: NullableStringFieldUpdateOperationsInput | string | null
    roeKsh?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    hsCode?: NullableStringFieldUpdateOperationsInput | string | null
    preparedBy?: NullableStringFieldUpdateOperationsInput | string | null
    cuInvoiceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    qrCodeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    cuDateTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cuSerialNumber?: NullableStringFieldUpdateOperationsInput | string | null
    customerPin?: NullableStringFieldUpdateOperationsInput | string | null
    documents?: DocumentUpdateManyWithoutShipmentNestedInput
  }

  export type ShipmentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clientName?: StringFieldUpdateOperationsInput | string
    blNumber?: StringFieldUpdateOperationsInput | string
    status?: EnumShipmentStatusFieldUpdateOperationsInput | $Enums.ShipmentStatus
    containerCount?: IntFieldUpdateOperationsInput | number
    isFeriSkipped?: BoolFieldUpdateOperationsInput | boolean
    feriNumber?: NullableStringFieldUpdateOperationsInput | string | null
    proformaNumber?: NullableStringFieldUpdateOperationsInput | string | null
    proformaAmountEUR?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    commissionEUR?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    exchangeRate?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    adAmountUSD?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    tioNumber?: NullableStringFieldUpdateOperationsInput | string | null
    ferriUSD?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    commUSD?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    totalUSD?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    wellRevenue?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    musungoRevenue?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    ogefremRevenue?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    invoiceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    invoiceDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    vesselName?: NullableStringFieldUpdateOperationsInput | string | null
    entryNumber?: NullableStringFieldUpdateOperationsInput | string | null
    roeKsh?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    hsCode?: NullableStringFieldUpdateOperationsInput | string | null
    preparedBy?: NullableStringFieldUpdateOperationsInput | string | null
    cuInvoiceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    qrCodeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    cuDateTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cuSerialNumber?: NullableStringFieldUpdateOperationsInput | string | null
    customerPin?: NullableStringFieldUpdateOperationsInput | string | null
    documents?: DocumentUncheckedUpdateManyWithoutShipmentNestedInput
  }

  export type ShipmentCreateManyInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    clientName: string
    blNumber: string
    status?: $Enums.ShipmentStatus
    containerCount?: number
    isFeriSkipped?: boolean
    feriNumber?: string | null
    proformaNumber?: string | null
    proformaAmountEUR?: Decimal | DecimalJsLike | number | string | null
    commissionEUR?: Decimal | DecimalJsLike | number | string | null
    exchangeRate?: Decimal | DecimalJsLike | number | string | null
    adAmountUSD?: Decimal | DecimalJsLike | number | string | null
    tioNumber?: string | null
    ferriUSD?: Decimal | DecimalJsLike | number | string | null
    commUSD?: Decimal | DecimalJsLike | number | string | null
    totalUSD?: Decimal | DecimalJsLike | number | string | null
    wellRevenue?: Decimal | DecimalJsLike | number | string | null
    musungoRevenue?: Decimal | DecimalJsLike | number | string | null
    ogefremRevenue?: Decimal | DecimalJsLike | number | string | null
    invoiceNumber?: string | null
    invoiceDate?: Date | string | null
    vesselName?: string | null
    entryNumber?: string | null
    roeKsh?: Decimal | DecimalJsLike | number | string | null
    hsCode?: string | null
    preparedBy?: string | null
    cuInvoiceNumber?: string | null
    qrCodeUrl?: string | null
    cuDateTime?: Date | string | null
    cuSerialNumber?: string | null
    customerPin?: string | null
  }

  export type ShipmentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clientName?: StringFieldUpdateOperationsInput | string
    blNumber?: StringFieldUpdateOperationsInput | string
    status?: EnumShipmentStatusFieldUpdateOperationsInput | $Enums.ShipmentStatus
    containerCount?: IntFieldUpdateOperationsInput | number
    isFeriSkipped?: BoolFieldUpdateOperationsInput | boolean
    feriNumber?: NullableStringFieldUpdateOperationsInput | string | null
    proformaNumber?: NullableStringFieldUpdateOperationsInput | string | null
    proformaAmountEUR?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    commissionEUR?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    exchangeRate?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    adAmountUSD?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    tioNumber?: NullableStringFieldUpdateOperationsInput | string | null
    ferriUSD?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    commUSD?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    totalUSD?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    wellRevenue?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    musungoRevenue?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    ogefremRevenue?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    invoiceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    invoiceDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    vesselName?: NullableStringFieldUpdateOperationsInput | string | null
    entryNumber?: NullableStringFieldUpdateOperationsInput | string | null
    roeKsh?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    hsCode?: NullableStringFieldUpdateOperationsInput | string | null
    preparedBy?: NullableStringFieldUpdateOperationsInput | string | null
    cuInvoiceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    qrCodeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    cuDateTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cuSerialNumber?: NullableStringFieldUpdateOperationsInput | string | null
    customerPin?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ShipmentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clientName?: StringFieldUpdateOperationsInput | string
    blNumber?: StringFieldUpdateOperationsInput | string
    status?: EnumShipmentStatusFieldUpdateOperationsInput | $Enums.ShipmentStatus
    containerCount?: IntFieldUpdateOperationsInput | number
    isFeriSkipped?: BoolFieldUpdateOperationsInput | boolean
    feriNumber?: NullableStringFieldUpdateOperationsInput | string | null
    proformaNumber?: NullableStringFieldUpdateOperationsInput | string | null
    proformaAmountEUR?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    commissionEUR?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    exchangeRate?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    adAmountUSD?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    tioNumber?: NullableStringFieldUpdateOperationsInput | string | null
    ferriUSD?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    commUSD?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    totalUSD?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    wellRevenue?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    musungoRevenue?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    ogefremRevenue?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    invoiceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    invoiceDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    vesselName?: NullableStringFieldUpdateOperationsInput | string | null
    entryNumber?: NullableStringFieldUpdateOperationsInput | string | null
    roeKsh?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    hsCode?: NullableStringFieldUpdateOperationsInput | string | null
    preparedBy?: NullableStringFieldUpdateOperationsInput | string | null
    cuInvoiceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    qrCodeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    cuDateTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cuSerialNumber?: NullableStringFieldUpdateOperationsInput | string | null
    customerPin?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DocumentCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    type: $Enums.DocumentType
    filename: string
    driveFileId: string
    driveUrl: string
    version?: number
    isReplaced?: boolean
    shipment: ShipmentCreateNestedOneWithoutDocumentsInput
  }

  export type DocumentUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    shipmentId: string
    type: $Enums.DocumentType
    filename: string
    driveFileId: string
    driveUrl: string
    version?: number
    isReplaced?: boolean
  }

  export type DocumentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumDocumentTypeFieldUpdateOperationsInput | $Enums.DocumentType
    filename?: StringFieldUpdateOperationsInput | string
    driveFileId?: StringFieldUpdateOperationsInput | string
    driveUrl?: StringFieldUpdateOperationsInput | string
    version?: IntFieldUpdateOperationsInput | number
    isReplaced?: BoolFieldUpdateOperationsInput | boolean
    shipment?: ShipmentUpdateOneRequiredWithoutDocumentsNestedInput
  }

  export type DocumentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    shipmentId?: StringFieldUpdateOperationsInput | string
    type?: EnumDocumentTypeFieldUpdateOperationsInput | $Enums.DocumentType
    filename?: StringFieldUpdateOperationsInput | string
    driveFileId?: StringFieldUpdateOperationsInput | string
    driveUrl?: StringFieldUpdateOperationsInput | string
    version?: IntFieldUpdateOperationsInput | number
    isReplaced?: BoolFieldUpdateOperationsInput | boolean
  }

  export type DocumentCreateManyInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    shipmentId: string
    type: $Enums.DocumentType
    filename: string
    driveFileId: string
    driveUrl: string
    version?: number
    isReplaced?: boolean
  }

  export type DocumentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumDocumentTypeFieldUpdateOperationsInput | $Enums.DocumentType
    filename?: StringFieldUpdateOperationsInput | string
    driveFileId?: StringFieldUpdateOperationsInput | string
    driveUrl?: StringFieldUpdateOperationsInput | string
    version?: IntFieldUpdateOperationsInput | number
    isReplaced?: BoolFieldUpdateOperationsInput | boolean
  }

  export type DocumentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    shipmentId?: StringFieldUpdateOperationsInput | string
    type?: EnumDocumentTypeFieldUpdateOperationsInput | $Enums.DocumentType
    filename?: StringFieldUpdateOperationsInput | string
    driveFileId?: StringFieldUpdateOperationsInput | string
    driveUrl?: StringFieldUpdateOperationsInput | string
    version?: IntFieldUpdateOperationsInput | number
    isReplaced?: BoolFieldUpdateOperationsInput | boolean
  }

  export type UserCreateInput = {
    id?: string
    email: string
    username: string
    password: string
    role?: string
    department?: string
    isSuspended?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    resetTokens?: ResetTokenCreateNestedManyWithoutUserInput
    activityLogs?: ActivityLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    username: string
    password: string
    role?: string
    department?: string
    isSuspended?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    resetTokens?: ResetTokenUncheckedCreateNestedManyWithoutUserInput
    activityLogs?: ActivityLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    isSuspended?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resetTokens?: ResetTokenUpdateManyWithoutUserNestedInput
    activityLogs?: ActivityLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    isSuspended?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resetTokens?: ResetTokenUncheckedUpdateManyWithoutUserNestedInput
    activityLogs?: ActivityLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    username: string
    password: string
    role?: string
    department?: string
    isSuspended?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    isSuspended?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    isSuspended?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResetTokenCreateInput = {
    id?: string
    token: string
    expires: Date | string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutResetTokensInput
  }

  export type ResetTokenUncheckedCreateInput = {
    id?: string
    token: string
    expires: Date | string
    createdAt?: Date | string
    userId: string
  }

  export type ResetTokenUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutResetTokensNestedInput
  }

  export type ResetTokenUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type ResetTokenCreateManyInput = {
    id?: string
    token: string
    expires: Date | string
    createdAt?: Date | string
    userId: string
  }

  export type ResetTokenUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResetTokenUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type ActivityLogCreateInput = {
    id?: string
    createdAt?: Date | string
    action: string
    entity: string
    entityId?: string | null
    detail?: string | null
    user: UserCreateNestedOneWithoutActivityLogsInput
  }

  export type ActivityLogUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    userId: string
    action: string
    entity: string
    entityId?: string | null
    detail?: string | null
  }

  export type ActivityLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    action?: StringFieldUpdateOperationsInput | string
    entity?: StringFieldUpdateOperationsInput | string
    entityId?: NullableStringFieldUpdateOperationsInput | string | null
    detail?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutActivityLogsNestedInput
  }

  export type ActivityLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    entity?: StringFieldUpdateOperationsInput | string
    entityId?: NullableStringFieldUpdateOperationsInput | string | null
    detail?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ActivityLogCreateManyInput = {
    id?: string
    createdAt?: Date | string
    userId: string
    action: string
    entity: string
    entityId?: string | null
    detail?: string | null
  }

  export type ActivityLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    action?: StringFieldUpdateOperationsInput | string
    entity?: StringFieldUpdateOperationsInput | string
    entityId?: NullableStringFieldUpdateOperationsInput | string | null
    detail?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ActivityLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    entity?: StringFieldUpdateOperationsInput | string
    entityId?: NullableStringFieldUpdateOperationsInput | string | null
    detail?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type WellShipmentCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    refNumber: string
    clientName: string
    clientRef?: string | null
    blNumber: string
    containerSize: string
    vesselName?: string | null
    eta?: Date | string | null
    status?: $Enums.WellShipmentStatus
    health?: string
    healthReason?: string | null
    currentStage?: string | null
    assignedOperator?: string | null
    shippingLine?: string | null
    origin?: string | null
    destination?: string | null
    finalDelivery?: string | null
    transporter?: string | null
    docRecv?: string | null
    lodgeCustoms?: Date | string | null
    entryNumber?: string | null
    entryPassed?: Date | string | null
    tblNtbl?: string | null
    slineCharges?: Date | string | null
    slinePaid?: Date | string | null
    ddRecv?: Date | string | null
    lastSlingCfs?: string | null
    lodgedKpa?: Date | string | null
    dateVerified?: Date | string | null
    isPaid?: boolean
    paidAt?: Date | string | null
    amount?: Decimal | DecimalJsLike | number | string | null
    roeKsh?: Decimal | DecimalJsLike | number | string | null
    invoiceDate?: Date | string | null
    notes?: string | null
    documents?: WellDocumentCreateNestedManyWithoutShipmentInput
    containers?: WellContainerCreateNestedManyWithoutShipmentInput
    events?: WellEventCreateNestedManyWithoutShipmentInput
    exceptions?: WellExceptionCreateNestedManyWithoutShipmentInput
    notesHistory?: WellShipmentNoteCreateNestedManyWithoutShipmentInput
  }

  export type WellShipmentUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    refNumber: string
    clientName: string
    clientRef?: string | null
    blNumber: string
    containerSize: string
    vesselName?: string | null
    eta?: Date | string | null
    status?: $Enums.WellShipmentStatus
    health?: string
    healthReason?: string | null
    currentStage?: string | null
    assignedOperator?: string | null
    shippingLine?: string | null
    origin?: string | null
    destination?: string | null
    finalDelivery?: string | null
    transporter?: string | null
    docRecv?: string | null
    lodgeCustoms?: Date | string | null
    entryNumber?: string | null
    entryPassed?: Date | string | null
    tblNtbl?: string | null
    slineCharges?: Date | string | null
    slinePaid?: Date | string | null
    ddRecv?: Date | string | null
    lastSlingCfs?: string | null
    lodgedKpa?: Date | string | null
    dateVerified?: Date | string | null
    isPaid?: boolean
    paidAt?: Date | string | null
    amount?: Decimal | DecimalJsLike | number | string | null
    roeKsh?: Decimal | DecimalJsLike | number | string | null
    invoiceDate?: Date | string | null
    notes?: string | null
    documents?: WellDocumentUncheckedCreateNestedManyWithoutShipmentInput
    containers?: WellContainerUncheckedCreateNestedManyWithoutShipmentInput
    events?: WellEventUncheckedCreateNestedManyWithoutShipmentInput
    exceptions?: WellExceptionUncheckedCreateNestedManyWithoutShipmentInput
    notesHistory?: WellShipmentNoteUncheckedCreateNestedManyWithoutShipmentInput
  }

  export type WellShipmentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    refNumber?: StringFieldUpdateOperationsInput | string
    clientName?: StringFieldUpdateOperationsInput | string
    clientRef?: NullableStringFieldUpdateOperationsInput | string | null
    blNumber?: StringFieldUpdateOperationsInput | string
    containerSize?: StringFieldUpdateOperationsInput | string
    vesselName?: NullableStringFieldUpdateOperationsInput | string | null
    eta?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumWellShipmentStatusFieldUpdateOperationsInput | $Enums.WellShipmentStatus
    health?: StringFieldUpdateOperationsInput | string
    healthReason?: NullableStringFieldUpdateOperationsInput | string | null
    currentStage?: NullableStringFieldUpdateOperationsInput | string | null
    assignedOperator?: NullableStringFieldUpdateOperationsInput | string | null
    shippingLine?: NullableStringFieldUpdateOperationsInput | string | null
    origin?: NullableStringFieldUpdateOperationsInput | string | null
    destination?: NullableStringFieldUpdateOperationsInput | string | null
    finalDelivery?: NullableStringFieldUpdateOperationsInput | string | null
    transporter?: NullableStringFieldUpdateOperationsInput | string | null
    docRecv?: NullableStringFieldUpdateOperationsInput | string | null
    lodgeCustoms?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    entryNumber?: NullableStringFieldUpdateOperationsInput | string | null
    entryPassed?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    tblNtbl?: NullableStringFieldUpdateOperationsInput | string | null
    slineCharges?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    slinePaid?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ddRecv?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastSlingCfs?: NullableStringFieldUpdateOperationsInput | string | null
    lodgedKpa?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dateVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isPaid?: BoolFieldUpdateOperationsInput | boolean
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    amount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    roeKsh?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    invoiceDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    documents?: WellDocumentUpdateManyWithoutShipmentNestedInput
    containers?: WellContainerUpdateManyWithoutShipmentNestedInput
    events?: WellEventUpdateManyWithoutShipmentNestedInput
    exceptions?: WellExceptionUpdateManyWithoutShipmentNestedInput
    notesHistory?: WellShipmentNoteUpdateManyWithoutShipmentNestedInput
  }

  export type WellShipmentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    refNumber?: StringFieldUpdateOperationsInput | string
    clientName?: StringFieldUpdateOperationsInput | string
    clientRef?: NullableStringFieldUpdateOperationsInput | string | null
    blNumber?: StringFieldUpdateOperationsInput | string
    containerSize?: StringFieldUpdateOperationsInput | string
    vesselName?: NullableStringFieldUpdateOperationsInput | string | null
    eta?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumWellShipmentStatusFieldUpdateOperationsInput | $Enums.WellShipmentStatus
    health?: StringFieldUpdateOperationsInput | string
    healthReason?: NullableStringFieldUpdateOperationsInput | string | null
    currentStage?: NullableStringFieldUpdateOperationsInput | string | null
    assignedOperator?: NullableStringFieldUpdateOperationsInput | string | null
    shippingLine?: NullableStringFieldUpdateOperationsInput | string | null
    origin?: NullableStringFieldUpdateOperationsInput | string | null
    destination?: NullableStringFieldUpdateOperationsInput | string | null
    finalDelivery?: NullableStringFieldUpdateOperationsInput | string | null
    transporter?: NullableStringFieldUpdateOperationsInput | string | null
    docRecv?: NullableStringFieldUpdateOperationsInput | string | null
    lodgeCustoms?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    entryNumber?: NullableStringFieldUpdateOperationsInput | string | null
    entryPassed?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    tblNtbl?: NullableStringFieldUpdateOperationsInput | string | null
    slineCharges?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    slinePaid?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ddRecv?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastSlingCfs?: NullableStringFieldUpdateOperationsInput | string | null
    lodgedKpa?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dateVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isPaid?: BoolFieldUpdateOperationsInput | boolean
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    amount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    roeKsh?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    invoiceDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    documents?: WellDocumentUncheckedUpdateManyWithoutShipmentNestedInput
    containers?: WellContainerUncheckedUpdateManyWithoutShipmentNestedInput
    events?: WellEventUncheckedUpdateManyWithoutShipmentNestedInput
    exceptions?: WellExceptionUncheckedUpdateManyWithoutShipmentNestedInput
    notesHistory?: WellShipmentNoteUncheckedUpdateManyWithoutShipmentNestedInput
  }

  export type WellShipmentCreateManyInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    refNumber: string
    clientName: string
    clientRef?: string | null
    blNumber: string
    containerSize: string
    vesselName?: string | null
    eta?: Date | string | null
    status?: $Enums.WellShipmentStatus
    health?: string
    healthReason?: string | null
    currentStage?: string | null
    assignedOperator?: string | null
    shippingLine?: string | null
    origin?: string | null
    destination?: string | null
    finalDelivery?: string | null
    transporter?: string | null
    docRecv?: string | null
    lodgeCustoms?: Date | string | null
    entryNumber?: string | null
    entryPassed?: Date | string | null
    tblNtbl?: string | null
    slineCharges?: Date | string | null
    slinePaid?: Date | string | null
    ddRecv?: Date | string | null
    lastSlingCfs?: string | null
    lodgedKpa?: Date | string | null
    dateVerified?: Date | string | null
    isPaid?: boolean
    paidAt?: Date | string | null
    amount?: Decimal | DecimalJsLike | number | string | null
    roeKsh?: Decimal | DecimalJsLike | number | string | null
    invoiceDate?: Date | string | null
    notes?: string | null
  }

  export type WellShipmentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    refNumber?: StringFieldUpdateOperationsInput | string
    clientName?: StringFieldUpdateOperationsInput | string
    clientRef?: NullableStringFieldUpdateOperationsInput | string | null
    blNumber?: StringFieldUpdateOperationsInput | string
    containerSize?: StringFieldUpdateOperationsInput | string
    vesselName?: NullableStringFieldUpdateOperationsInput | string | null
    eta?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumWellShipmentStatusFieldUpdateOperationsInput | $Enums.WellShipmentStatus
    health?: StringFieldUpdateOperationsInput | string
    healthReason?: NullableStringFieldUpdateOperationsInput | string | null
    currentStage?: NullableStringFieldUpdateOperationsInput | string | null
    assignedOperator?: NullableStringFieldUpdateOperationsInput | string | null
    shippingLine?: NullableStringFieldUpdateOperationsInput | string | null
    origin?: NullableStringFieldUpdateOperationsInput | string | null
    destination?: NullableStringFieldUpdateOperationsInput | string | null
    finalDelivery?: NullableStringFieldUpdateOperationsInput | string | null
    transporter?: NullableStringFieldUpdateOperationsInput | string | null
    docRecv?: NullableStringFieldUpdateOperationsInput | string | null
    lodgeCustoms?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    entryNumber?: NullableStringFieldUpdateOperationsInput | string | null
    entryPassed?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    tblNtbl?: NullableStringFieldUpdateOperationsInput | string | null
    slineCharges?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    slinePaid?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ddRecv?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastSlingCfs?: NullableStringFieldUpdateOperationsInput | string | null
    lodgedKpa?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dateVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isPaid?: BoolFieldUpdateOperationsInput | boolean
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    amount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    roeKsh?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    invoiceDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type WellShipmentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    refNumber?: StringFieldUpdateOperationsInput | string
    clientName?: StringFieldUpdateOperationsInput | string
    clientRef?: NullableStringFieldUpdateOperationsInput | string | null
    blNumber?: StringFieldUpdateOperationsInput | string
    containerSize?: StringFieldUpdateOperationsInput | string
    vesselName?: NullableStringFieldUpdateOperationsInput | string | null
    eta?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumWellShipmentStatusFieldUpdateOperationsInput | $Enums.WellShipmentStatus
    health?: StringFieldUpdateOperationsInput | string
    healthReason?: NullableStringFieldUpdateOperationsInput | string | null
    currentStage?: NullableStringFieldUpdateOperationsInput | string | null
    assignedOperator?: NullableStringFieldUpdateOperationsInput | string | null
    shippingLine?: NullableStringFieldUpdateOperationsInput | string | null
    origin?: NullableStringFieldUpdateOperationsInput | string | null
    destination?: NullableStringFieldUpdateOperationsInput | string | null
    finalDelivery?: NullableStringFieldUpdateOperationsInput | string | null
    transporter?: NullableStringFieldUpdateOperationsInput | string | null
    docRecv?: NullableStringFieldUpdateOperationsInput | string | null
    lodgeCustoms?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    entryNumber?: NullableStringFieldUpdateOperationsInput | string | null
    entryPassed?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    tblNtbl?: NullableStringFieldUpdateOperationsInput | string | null
    slineCharges?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    slinePaid?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ddRecv?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastSlingCfs?: NullableStringFieldUpdateOperationsInput | string | null
    lodgedKpa?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dateVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isPaid?: BoolFieldUpdateOperationsInput | boolean
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    amount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    roeKsh?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    invoiceDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type WellEventCreateInput = {
    id?: string
    title: string
    description?: string | null
    stage?: string | null
    source?: string
    updatedBy?: string
    reference?: string | null
    createdAt?: Date | string
    shipment: WellShipmentCreateNestedOneWithoutEventsInput
  }

  export type WellEventUncheckedCreateInput = {
    id?: string
    shipmentId: string
    title: string
    description?: string | null
    stage?: string | null
    source?: string
    updatedBy?: string
    reference?: string | null
    createdAt?: Date | string
  }

  export type WellEventUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    stage?: NullableStringFieldUpdateOperationsInput | string | null
    source?: StringFieldUpdateOperationsInput | string
    updatedBy?: StringFieldUpdateOperationsInput | string
    reference?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    shipment?: WellShipmentUpdateOneRequiredWithoutEventsNestedInput
  }

  export type WellEventUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    shipmentId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    stage?: NullableStringFieldUpdateOperationsInput | string | null
    source?: StringFieldUpdateOperationsInput | string
    updatedBy?: StringFieldUpdateOperationsInput | string
    reference?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WellEventCreateManyInput = {
    id?: string
    shipmentId: string
    title: string
    description?: string | null
    stage?: string | null
    source?: string
    updatedBy?: string
    reference?: string | null
    createdAt?: Date | string
  }

  export type WellEventUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    stage?: NullableStringFieldUpdateOperationsInput | string | null
    source?: StringFieldUpdateOperationsInput | string
    updatedBy?: StringFieldUpdateOperationsInput | string
    reference?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WellEventUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    shipmentId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    stage?: NullableStringFieldUpdateOperationsInput | string | null
    source?: StringFieldUpdateOperationsInput | string
    updatedBy?: StringFieldUpdateOperationsInput | string
    reference?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WellExceptionCreateInput = {
    id?: string
    containerId?: string | null
    issueType: string
    severity?: string
    status?: string
    description: string
    expectedResolution?: string | null
    assignedTo?: string | null
    dueDate?: Date | string | null
    createdBy?: string
    createdAt?: Date | string
    resolvedAt?: Date | string | null
    resolvedBy?: string | null
    shipment: WellShipmentCreateNestedOneWithoutExceptionsInput
  }

  export type WellExceptionUncheckedCreateInput = {
    id?: string
    shipmentId: string
    containerId?: string | null
    issueType: string
    severity?: string
    status?: string
    description: string
    expectedResolution?: string | null
    assignedTo?: string | null
    dueDate?: Date | string | null
    createdBy?: string
    createdAt?: Date | string
    resolvedAt?: Date | string | null
    resolvedBy?: string | null
  }

  export type WellExceptionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    containerId?: NullableStringFieldUpdateOperationsInput | string | null
    issueType?: StringFieldUpdateOperationsInput | string
    severity?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    expectedResolution?: NullableStringFieldUpdateOperationsInput | string | null
    assignedTo?: NullableStringFieldUpdateOperationsInput | string | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    shipment?: WellShipmentUpdateOneRequiredWithoutExceptionsNestedInput
  }

  export type WellExceptionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    shipmentId?: StringFieldUpdateOperationsInput | string
    containerId?: NullableStringFieldUpdateOperationsInput | string | null
    issueType?: StringFieldUpdateOperationsInput | string
    severity?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    expectedResolution?: NullableStringFieldUpdateOperationsInput | string | null
    assignedTo?: NullableStringFieldUpdateOperationsInput | string | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolvedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type WellExceptionCreateManyInput = {
    id?: string
    shipmentId: string
    containerId?: string | null
    issueType: string
    severity?: string
    status?: string
    description: string
    expectedResolution?: string | null
    assignedTo?: string | null
    dueDate?: Date | string | null
    createdBy?: string
    createdAt?: Date | string
    resolvedAt?: Date | string | null
    resolvedBy?: string | null
  }

  export type WellExceptionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    containerId?: NullableStringFieldUpdateOperationsInput | string | null
    issueType?: StringFieldUpdateOperationsInput | string
    severity?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    expectedResolution?: NullableStringFieldUpdateOperationsInput | string | null
    assignedTo?: NullableStringFieldUpdateOperationsInput | string | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolvedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type WellExceptionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    shipmentId?: StringFieldUpdateOperationsInput | string
    containerId?: NullableStringFieldUpdateOperationsInput | string | null
    issueType?: StringFieldUpdateOperationsInput | string
    severity?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    expectedResolution?: NullableStringFieldUpdateOperationsInput | string | null
    assignedTo?: NullableStringFieldUpdateOperationsInput | string | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolvedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type WellContainerCreateInput = {
    id?: string
    containerNumber: string
    size?: string | null
    weight?: number | null
    dischargeDate?: Date | string | null
    gateOutDate?: Date | string | null
    truckDetails?: string | null
    driverName?: string | null
    status?: string | null
    remarks?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    shipment: WellShipmentCreateNestedOneWithoutContainersInput
  }

  export type WellContainerUncheckedCreateInput = {
    id?: string
    shipmentId: string
    containerNumber: string
    size?: string | null
    weight?: number | null
    dischargeDate?: Date | string | null
    gateOutDate?: Date | string | null
    truckDetails?: string | null
    driverName?: string | null
    status?: string | null
    remarks?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WellContainerUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    containerNumber?: StringFieldUpdateOperationsInput | string
    size?: NullableStringFieldUpdateOperationsInput | string | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    dischargeDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gateOutDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    truckDetails?: NullableStringFieldUpdateOperationsInput | string | null
    driverName?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    shipment?: WellShipmentUpdateOneRequiredWithoutContainersNestedInput
  }

  export type WellContainerUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    shipmentId?: StringFieldUpdateOperationsInput | string
    containerNumber?: StringFieldUpdateOperationsInput | string
    size?: NullableStringFieldUpdateOperationsInput | string | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    dischargeDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gateOutDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    truckDetails?: NullableStringFieldUpdateOperationsInput | string | null
    driverName?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WellContainerCreateManyInput = {
    id?: string
    shipmentId: string
    containerNumber: string
    size?: string | null
    weight?: number | null
    dischargeDate?: Date | string | null
    gateOutDate?: Date | string | null
    truckDetails?: string | null
    driverName?: string | null
    status?: string | null
    remarks?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WellContainerUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    containerNumber?: StringFieldUpdateOperationsInput | string
    size?: NullableStringFieldUpdateOperationsInput | string | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    dischargeDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gateOutDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    truckDetails?: NullableStringFieldUpdateOperationsInput | string | null
    driverName?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WellContainerUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    shipmentId?: StringFieldUpdateOperationsInput | string
    containerNumber?: StringFieldUpdateOperationsInput | string
    size?: NullableStringFieldUpdateOperationsInput | string | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    dischargeDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gateOutDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    truckDetails?: NullableStringFieldUpdateOperationsInput | string | null
    driverName?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WellDocumentCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    filename: string
    driveFileId: string
    driveUrl: string
    docType: string
    shipment: WellShipmentCreateNestedOneWithoutDocumentsInput
  }

  export type WellDocumentUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    shipmentId: string
    filename: string
    driveFileId: string
    driveUrl: string
    docType: string
  }

  export type WellDocumentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    filename?: StringFieldUpdateOperationsInput | string
    driveFileId?: StringFieldUpdateOperationsInput | string
    driveUrl?: StringFieldUpdateOperationsInput | string
    docType?: StringFieldUpdateOperationsInput | string
    shipment?: WellShipmentUpdateOneRequiredWithoutDocumentsNestedInput
  }

  export type WellDocumentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    shipmentId?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    driveFileId?: StringFieldUpdateOperationsInput | string
    driveUrl?: StringFieldUpdateOperationsInput | string
    docType?: StringFieldUpdateOperationsInput | string
  }

  export type WellDocumentCreateManyInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    shipmentId: string
    filename: string
    driveFileId: string
    driveUrl: string
    docType: string
  }

  export type WellDocumentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    filename?: StringFieldUpdateOperationsInput | string
    driveFileId?: StringFieldUpdateOperationsInput | string
    driveUrl?: StringFieldUpdateOperationsInput | string
    docType?: StringFieldUpdateOperationsInput | string
  }

  export type WellDocumentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    shipmentId?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    driveFileId?: StringFieldUpdateOperationsInput | string
    driveUrl?: StringFieldUpdateOperationsInput | string
    docType?: StringFieldUpdateOperationsInput | string
  }

  export type WellRefCounterCreateInput = {
    id?: number
    lastRef?: number
  }

  export type WellRefCounterUncheckedCreateInput = {
    id?: number
    lastRef?: number
  }

  export type WellRefCounterUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    lastRef?: IntFieldUpdateOperationsInput | number
  }

  export type WellRefCounterUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    lastRef?: IntFieldUpdateOperationsInput | number
  }

  export type WellRefCounterCreateManyInput = {
    id?: number
    lastRef?: number
  }

  export type WellRefCounterUpdateManyMutationInput = {
    id?: IntFieldUpdateOperationsInput | number
    lastRef?: IntFieldUpdateOperationsInput | number
  }

  export type WellRefCounterUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    lastRef?: IntFieldUpdateOperationsInput | number
  }

  export type WellShipmentNoteCreateInput = {
    id?: string
    note: string
    createdBy?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    shipment: WellShipmentCreateNestedOneWithoutNotesHistoryInput
  }

  export type WellShipmentNoteUncheckedCreateInput = {
    id?: string
    shipmentId: string
    note: string
    createdBy?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WellShipmentNoteUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    note?: StringFieldUpdateOperationsInput | string
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    shipment?: WellShipmentUpdateOneRequiredWithoutNotesHistoryNestedInput
  }

  export type WellShipmentNoteUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    shipmentId?: StringFieldUpdateOperationsInput | string
    note?: StringFieldUpdateOperationsInput | string
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WellShipmentNoteCreateManyInput = {
    id?: string
    shipmentId: string
    note: string
    createdBy?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WellShipmentNoteUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    note?: StringFieldUpdateOperationsInput | string
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WellShipmentNoteUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    shipmentId?: StringFieldUpdateOperationsInput | string
    note?: StringFieldUpdateOperationsInput | string
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type EnumShipmentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ShipmentStatus | EnumShipmentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ShipmentStatus[] | ListEnumShipmentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ShipmentStatus[] | ListEnumShipmentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumShipmentStatusFilter<$PrismaModel> | $Enums.ShipmentStatus
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type DocumentListRelationFilter = {
    every?: DocumentWhereInput
    some?: DocumentWhereInput
    none?: DocumentWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type DocumentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ShipmentCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    clientName?: SortOrder
    blNumber?: SortOrder
    status?: SortOrder
    containerCount?: SortOrder
    isFeriSkipped?: SortOrder
    feriNumber?: SortOrder
    proformaNumber?: SortOrder
    proformaAmountEUR?: SortOrder
    commissionEUR?: SortOrder
    exchangeRate?: SortOrder
    adAmountUSD?: SortOrder
    tioNumber?: SortOrder
    ferriUSD?: SortOrder
    commUSD?: SortOrder
    totalUSD?: SortOrder
    wellRevenue?: SortOrder
    musungoRevenue?: SortOrder
    ogefremRevenue?: SortOrder
    invoiceNumber?: SortOrder
    invoiceDate?: SortOrder
    vesselName?: SortOrder
    entryNumber?: SortOrder
    roeKsh?: SortOrder
    hsCode?: SortOrder
    preparedBy?: SortOrder
    cuInvoiceNumber?: SortOrder
    qrCodeUrl?: SortOrder
    cuDateTime?: SortOrder
    cuSerialNumber?: SortOrder
    customerPin?: SortOrder
  }

  export type ShipmentAvgOrderByAggregateInput = {
    containerCount?: SortOrder
    proformaAmountEUR?: SortOrder
    commissionEUR?: SortOrder
    exchangeRate?: SortOrder
    adAmountUSD?: SortOrder
    ferriUSD?: SortOrder
    commUSD?: SortOrder
    totalUSD?: SortOrder
    wellRevenue?: SortOrder
    musungoRevenue?: SortOrder
    ogefremRevenue?: SortOrder
    roeKsh?: SortOrder
  }

  export type ShipmentMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    clientName?: SortOrder
    blNumber?: SortOrder
    status?: SortOrder
    containerCount?: SortOrder
    isFeriSkipped?: SortOrder
    feriNumber?: SortOrder
    proformaNumber?: SortOrder
    proformaAmountEUR?: SortOrder
    commissionEUR?: SortOrder
    exchangeRate?: SortOrder
    adAmountUSD?: SortOrder
    tioNumber?: SortOrder
    ferriUSD?: SortOrder
    commUSD?: SortOrder
    totalUSD?: SortOrder
    wellRevenue?: SortOrder
    musungoRevenue?: SortOrder
    ogefremRevenue?: SortOrder
    invoiceNumber?: SortOrder
    invoiceDate?: SortOrder
    vesselName?: SortOrder
    entryNumber?: SortOrder
    roeKsh?: SortOrder
    hsCode?: SortOrder
    preparedBy?: SortOrder
    cuInvoiceNumber?: SortOrder
    qrCodeUrl?: SortOrder
    cuDateTime?: SortOrder
    cuSerialNumber?: SortOrder
    customerPin?: SortOrder
  }

  export type ShipmentMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    clientName?: SortOrder
    blNumber?: SortOrder
    status?: SortOrder
    containerCount?: SortOrder
    isFeriSkipped?: SortOrder
    feriNumber?: SortOrder
    proformaNumber?: SortOrder
    proformaAmountEUR?: SortOrder
    commissionEUR?: SortOrder
    exchangeRate?: SortOrder
    adAmountUSD?: SortOrder
    tioNumber?: SortOrder
    ferriUSD?: SortOrder
    commUSD?: SortOrder
    totalUSD?: SortOrder
    wellRevenue?: SortOrder
    musungoRevenue?: SortOrder
    ogefremRevenue?: SortOrder
    invoiceNumber?: SortOrder
    invoiceDate?: SortOrder
    vesselName?: SortOrder
    entryNumber?: SortOrder
    roeKsh?: SortOrder
    hsCode?: SortOrder
    preparedBy?: SortOrder
    cuInvoiceNumber?: SortOrder
    qrCodeUrl?: SortOrder
    cuDateTime?: SortOrder
    cuSerialNumber?: SortOrder
    customerPin?: SortOrder
  }

  export type ShipmentSumOrderByAggregateInput = {
    containerCount?: SortOrder
    proformaAmountEUR?: SortOrder
    commissionEUR?: SortOrder
    exchangeRate?: SortOrder
    adAmountUSD?: SortOrder
    ferriUSD?: SortOrder
    commUSD?: SortOrder
    totalUSD?: SortOrder
    wellRevenue?: SortOrder
    musungoRevenue?: SortOrder
    ogefremRevenue?: SortOrder
    roeKsh?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumShipmentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ShipmentStatus | EnumShipmentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ShipmentStatus[] | ListEnumShipmentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ShipmentStatus[] | ListEnumShipmentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumShipmentStatusWithAggregatesFilter<$PrismaModel> | $Enums.ShipmentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumShipmentStatusFilter<$PrismaModel>
    _max?: NestedEnumShipmentStatusFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type EnumDocumentTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.DocumentType | EnumDocumentTypeFieldRefInput<$PrismaModel>
    in?: $Enums.DocumentType[] | ListEnumDocumentTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.DocumentType[] | ListEnumDocumentTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumDocumentTypeFilter<$PrismaModel> | $Enums.DocumentType
  }

  export type ShipmentScalarRelationFilter = {
    is?: ShipmentWhereInput
    isNot?: ShipmentWhereInput
  }

  export type DocumentCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    shipmentId?: SortOrder
    type?: SortOrder
    filename?: SortOrder
    driveFileId?: SortOrder
    driveUrl?: SortOrder
    version?: SortOrder
    isReplaced?: SortOrder
  }

  export type DocumentAvgOrderByAggregateInput = {
    version?: SortOrder
  }

  export type DocumentMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    shipmentId?: SortOrder
    type?: SortOrder
    filename?: SortOrder
    driveFileId?: SortOrder
    driveUrl?: SortOrder
    version?: SortOrder
    isReplaced?: SortOrder
  }

  export type DocumentMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    shipmentId?: SortOrder
    type?: SortOrder
    filename?: SortOrder
    driveFileId?: SortOrder
    driveUrl?: SortOrder
    version?: SortOrder
    isReplaced?: SortOrder
  }

  export type DocumentSumOrderByAggregateInput = {
    version?: SortOrder
  }

  export type EnumDocumentTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DocumentType | EnumDocumentTypeFieldRefInput<$PrismaModel>
    in?: $Enums.DocumentType[] | ListEnumDocumentTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.DocumentType[] | ListEnumDocumentTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumDocumentTypeWithAggregatesFilter<$PrismaModel> | $Enums.DocumentType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDocumentTypeFilter<$PrismaModel>
    _max?: NestedEnumDocumentTypeFilter<$PrismaModel>
  }

  export type ResetTokenListRelationFilter = {
    every?: ResetTokenWhereInput
    some?: ResetTokenWhereInput
    none?: ResetTokenWhereInput
  }

  export type ActivityLogListRelationFilter = {
    every?: ActivityLogWhereInput
    some?: ActivityLogWhereInput
    none?: ActivityLogWhereInput
  }

  export type ResetTokenOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ActivityLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    username?: SortOrder
    password?: SortOrder
    role?: SortOrder
    department?: SortOrder
    isSuspended?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    username?: SortOrder
    password?: SortOrder
    role?: SortOrder
    department?: SortOrder
    isSuspended?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    username?: SortOrder
    password?: SortOrder
    role?: SortOrder
    department?: SortOrder
    isSuspended?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type ResetTokenCountOrderByAggregateInput = {
    id?: SortOrder
    token?: SortOrder
    expires?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
  }

  export type ResetTokenMaxOrderByAggregateInput = {
    id?: SortOrder
    token?: SortOrder
    expires?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
  }

  export type ResetTokenMinOrderByAggregateInput = {
    id?: SortOrder
    token?: SortOrder
    expires?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
  }

  export type ActivityLogCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    entity?: SortOrder
    entityId?: SortOrder
    detail?: SortOrder
  }

  export type ActivityLogMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    entity?: SortOrder
    entityId?: SortOrder
    detail?: SortOrder
  }

  export type ActivityLogMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    entity?: SortOrder
    entityId?: SortOrder
    detail?: SortOrder
  }

  export type EnumWellShipmentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.WellShipmentStatus | EnumWellShipmentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.WellShipmentStatus[] | ListEnumWellShipmentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.WellShipmentStatus[] | ListEnumWellShipmentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumWellShipmentStatusFilter<$PrismaModel> | $Enums.WellShipmentStatus
  }

  export type WellDocumentListRelationFilter = {
    every?: WellDocumentWhereInput
    some?: WellDocumentWhereInput
    none?: WellDocumentWhereInput
  }

  export type WellContainerListRelationFilter = {
    every?: WellContainerWhereInput
    some?: WellContainerWhereInput
    none?: WellContainerWhereInput
  }

  export type WellEventListRelationFilter = {
    every?: WellEventWhereInput
    some?: WellEventWhereInput
    none?: WellEventWhereInput
  }

  export type WellExceptionListRelationFilter = {
    every?: WellExceptionWhereInput
    some?: WellExceptionWhereInput
    none?: WellExceptionWhereInput
  }

  export type WellShipmentNoteListRelationFilter = {
    every?: WellShipmentNoteWhereInput
    some?: WellShipmentNoteWhereInput
    none?: WellShipmentNoteWhereInput
  }

  export type WellDocumentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type WellContainerOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type WellEventOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type WellExceptionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type WellShipmentNoteOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type WellShipmentCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    refNumber?: SortOrder
    clientName?: SortOrder
    clientRef?: SortOrder
    blNumber?: SortOrder
    containerSize?: SortOrder
    vesselName?: SortOrder
    eta?: SortOrder
    status?: SortOrder
    health?: SortOrder
    healthReason?: SortOrder
    currentStage?: SortOrder
    assignedOperator?: SortOrder
    shippingLine?: SortOrder
    origin?: SortOrder
    destination?: SortOrder
    finalDelivery?: SortOrder
    transporter?: SortOrder
    docRecv?: SortOrder
    lodgeCustoms?: SortOrder
    entryNumber?: SortOrder
    entryPassed?: SortOrder
    tblNtbl?: SortOrder
    slineCharges?: SortOrder
    slinePaid?: SortOrder
    ddRecv?: SortOrder
    lastSlingCfs?: SortOrder
    lodgedKpa?: SortOrder
    dateVerified?: SortOrder
    isPaid?: SortOrder
    paidAt?: SortOrder
    amount?: SortOrder
    roeKsh?: SortOrder
    invoiceDate?: SortOrder
    notes?: SortOrder
  }

  export type WellShipmentAvgOrderByAggregateInput = {
    amount?: SortOrder
    roeKsh?: SortOrder
  }

  export type WellShipmentMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    refNumber?: SortOrder
    clientName?: SortOrder
    clientRef?: SortOrder
    blNumber?: SortOrder
    containerSize?: SortOrder
    vesselName?: SortOrder
    eta?: SortOrder
    status?: SortOrder
    health?: SortOrder
    healthReason?: SortOrder
    currentStage?: SortOrder
    assignedOperator?: SortOrder
    shippingLine?: SortOrder
    origin?: SortOrder
    destination?: SortOrder
    finalDelivery?: SortOrder
    transporter?: SortOrder
    docRecv?: SortOrder
    lodgeCustoms?: SortOrder
    entryNumber?: SortOrder
    entryPassed?: SortOrder
    tblNtbl?: SortOrder
    slineCharges?: SortOrder
    slinePaid?: SortOrder
    ddRecv?: SortOrder
    lastSlingCfs?: SortOrder
    lodgedKpa?: SortOrder
    dateVerified?: SortOrder
    isPaid?: SortOrder
    paidAt?: SortOrder
    amount?: SortOrder
    roeKsh?: SortOrder
    invoiceDate?: SortOrder
    notes?: SortOrder
  }

  export type WellShipmentMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    refNumber?: SortOrder
    clientName?: SortOrder
    clientRef?: SortOrder
    blNumber?: SortOrder
    containerSize?: SortOrder
    vesselName?: SortOrder
    eta?: SortOrder
    status?: SortOrder
    health?: SortOrder
    healthReason?: SortOrder
    currentStage?: SortOrder
    assignedOperator?: SortOrder
    shippingLine?: SortOrder
    origin?: SortOrder
    destination?: SortOrder
    finalDelivery?: SortOrder
    transporter?: SortOrder
    docRecv?: SortOrder
    lodgeCustoms?: SortOrder
    entryNumber?: SortOrder
    entryPassed?: SortOrder
    tblNtbl?: SortOrder
    slineCharges?: SortOrder
    slinePaid?: SortOrder
    ddRecv?: SortOrder
    lastSlingCfs?: SortOrder
    lodgedKpa?: SortOrder
    dateVerified?: SortOrder
    isPaid?: SortOrder
    paidAt?: SortOrder
    amount?: SortOrder
    roeKsh?: SortOrder
    invoiceDate?: SortOrder
    notes?: SortOrder
  }

  export type WellShipmentSumOrderByAggregateInput = {
    amount?: SortOrder
    roeKsh?: SortOrder
  }

  export type EnumWellShipmentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.WellShipmentStatus | EnumWellShipmentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.WellShipmentStatus[] | ListEnumWellShipmentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.WellShipmentStatus[] | ListEnumWellShipmentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumWellShipmentStatusWithAggregatesFilter<$PrismaModel> | $Enums.WellShipmentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumWellShipmentStatusFilter<$PrismaModel>
    _max?: NestedEnumWellShipmentStatusFilter<$PrismaModel>
  }

  export type WellShipmentScalarRelationFilter = {
    is?: WellShipmentWhereInput
    isNot?: WellShipmentWhereInput
  }

  export type WellEventCountOrderByAggregateInput = {
    id?: SortOrder
    shipmentId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    stage?: SortOrder
    source?: SortOrder
    updatedBy?: SortOrder
    reference?: SortOrder
    createdAt?: SortOrder
  }

  export type WellEventMaxOrderByAggregateInput = {
    id?: SortOrder
    shipmentId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    stage?: SortOrder
    source?: SortOrder
    updatedBy?: SortOrder
    reference?: SortOrder
    createdAt?: SortOrder
  }

  export type WellEventMinOrderByAggregateInput = {
    id?: SortOrder
    shipmentId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    stage?: SortOrder
    source?: SortOrder
    updatedBy?: SortOrder
    reference?: SortOrder
    createdAt?: SortOrder
  }

  export type WellExceptionCountOrderByAggregateInput = {
    id?: SortOrder
    shipmentId?: SortOrder
    containerId?: SortOrder
    issueType?: SortOrder
    severity?: SortOrder
    status?: SortOrder
    description?: SortOrder
    expectedResolution?: SortOrder
    assignedTo?: SortOrder
    dueDate?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    resolvedAt?: SortOrder
    resolvedBy?: SortOrder
  }

  export type WellExceptionMaxOrderByAggregateInput = {
    id?: SortOrder
    shipmentId?: SortOrder
    containerId?: SortOrder
    issueType?: SortOrder
    severity?: SortOrder
    status?: SortOrder
    description?: SortOrder
    expectedResolution?: SortOrder
    assignedTo?: SortOrder
    dueDate?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    resolvedAt?: SortOrder
    resolvedBy?: SortOrder
  }

  export type WellExceptionMinOrderByAggregateInput = {
    id?: SortOrder
    shipmentId?: SortOrder
    containerId?: SortOrder
    issueType?: SortOrder
    severity?: SortOrder
    status?: SortOrder
    description?: SortOrder
    expectedResolution?: SortOrder
    assignedTo?: SortOrder
    dueDate?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    resolvedAt?: SortOrder
    resolvedBy?: SortOrder
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type WellContainerCountOrderByAggregateInput = {
    id?: SortOrder
    shipmentId?: SortOrder
    containerNumber?: SortOrder
    size?: SortOrder
    weight?: SortOrder
    dischargeDate?: SortOrder
    gateOutDate?: SortOrder
    truckDetails?: SortOrder
    driverName?: SortOrder
    status?: SortOrder
    remarks?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WellContainerAvgOrderByAggregateInput = {
    weight?: SortOrder
  }

  export type WellContainerMaxOrderByAggregateInput = {
    id?: SortOrder
    shipmentId?: SortOrder
    containerNumber?: SortOrder
    size?: SortOrder
    weight?: SortOrder
    dischargeDate?: SortOrder
    gateOutDate?: SortOrder
    truckDetails?: SortOrder
    driverName?: SortOrder
    status?: SortOrder
    remarks?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WellContainerMinOrderByAggregateInput = {
    id?: SortOrder
    shipmentId?: SortOrder
    containerNumber?: SortOrder
    size?: SortOrder
    weight?: SortOrder
    dischargeDate?: SortOrder
    gateOutDate?: SortOrder
    truckDetails?: SortOrder
    driverName?: SortOrder
    status?: SortOrder
    remarks?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WellContainerSumOrderByAggregateInput = {
    weight?: SortOrder
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type WellDocumentCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    shipmentId?: SortOrder
    filename?: SortOrder
    driveFileId?: SortOrder
    driveUrl?: SortOrder
    docType?: SortOrder
  }

  export type WellDocumentMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    shipmentId?: SortOrder
    filename?: SortOrder
    driveFileId?: SortOrder
    driveUrl?: SortOrder
    docType?: SortOrder
  }

  export type WellDocumentMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    shipmentId?: SortOrder
    filename?: SortOrder
    driveFileId?: SortOrder
    driveUrl?: SortOrder
    docType?: SortOrder
  }

  export type WellRefCounterCountOrderByAggregateInput = {
    id?: SortOrder
    lastRef?: SortOrder
  }

  export type WellRefCounterAvgOrderByAggregateInput = {
    id?: SortOrder
    lastRef?: SortOrder
  }

  export type WellRefCounterMaxOrderByAggregateInput = {
    id?: SortOrder
    lastRef?: SortOrder
  }

  export type WellRefCounterMinOrderByAggregateInput = {
    id?: SortOrder
    lastRef?: SortOrder
  }

  export type WellRefCounterSumOrderByAggregateInput = {
    id?: SortOrder
    lastRef?: SortOrder
  }

  export type WellShipmentNoteCountOrderByAggregateInput = {
    id?: SortOrder
    shipmentId?: SortOrder
    note?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WellShipmentNoteMaxOrderByAggregateInput = {
    id?: SortOrder
    shipmentId?: SortOrder
    note?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WellShipmentNoteMinOrderByAggregateInput = {
    id?: SortOrder
    shipmentId?: SortOrder
    note?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DocumentCreateNestedManyWithoutShipmentInput = {
    create?: XOR<DocumentCreateWithoutShipmentInput, DocumentUncheckedCreateWithoutShipmentInput> | DocumentCreateWithoutShipmentInput[] | DocumentUncheckedCreateWithoutShipmentInput[]
    connectOrCreate?: DocumentCreateOrConnectWithoutShipmentInput | DocumentCreateOrConnectWithoutShipmentInput[]
    createMany?: DocumentCreateManyShipmentInputEnvelope
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
  }

  export type DocumentUncheckedCreateNestedManyWithoutShipmentInput = {
    create?: XOR<DocumentCreateWithoutShipmentInput, DocumentUncheckedCreateWithoutShipmentInput> | DocumentCreateWithoutShipmentInput[] | DocumentUncheckedCreateWithoutShipmentInput[]
    connectOrCreate?: DocumentCreateOrConnectWithoutShipmentInput | DocumentCreateOrConnectWithoutShipmentInput[]
    createMany?: DocumentCreateManyShipmentInputEnvelope
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type EnumShipmentStatusFieldUpdateOperationsInput = {
    set?: $Enums.ShipmentStatus
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string | null
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type DocumentUpdateManyWithoutShipmentNestedInput = {
    create?: XOR<DocumentCreateWithoutShipmentInput, DocumentUncheckedCreateWithoutShipmentInput> | DocumentCreateWithoutShipmentInput[] | DocumentUncheckedCreateWithoutShipmentInput[]
    connectOrCreate?: DocumentCreateOrConnectWithoutShipmentInput | DocumentCreateOrConnectWithoutShipmentInput[]
    upsert?: DocumentUpsertWithWhereUniqueWithoutShipmentInput | DocumentUpsertWithWhereUniqueWithoutShipmentInput[]
    createMany?: DocumentCreateManyShipmentInputEnvelope
    set?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    disconnect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    delete?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    update?: DocumentUpdateWithWhereUniqueWithoutShipmentInput | DocumentUpdateWithWhereUniqueWithoutShipmentInput[]
    updateMany?: DocumentUpdateManyWithWhereWithoutShipmentInput | DocumentUpdateManyWithWhereWithoutShipmentInput[]
    deleteMany?: DocumentScalarWhereInput | DocumentScalarWhereInput[]
  }

  export type DocumentUncheckedUpdateManyWithoutShipmentNestedInput = {
    create?: XOR<DocumentCreateWithoutShipmentInput, DocumentUncheckedCreateWithoutShipmentInput> | DocumentCreateWithoutShipmentInput[] | DocumentUncheckedCreateWithoutShipmentInput[]
    connectOrCreate?: DocumentCreateOrConnectWithoutShipmentInput | DocumentCreateOrConnectWithoutShipmentInput[]
    upsert?: DocumentUpsertWithWhereUniqueWithoutShipmentInput | DocumentUpsertWithWhereUniqueWithoutShipmentInput[]
    createMany?: DocumentCreateManyShipmentInputEnvelope
    set?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    disconnect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    delete?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    update?: DocumentUpdateWithWhereUniqueWithoutShipmentInput | DocumentUpdateWithWhereUniqueWithoutShipmentInput[]
    updateMany?: DocumentUpdateManyWithWhereWithoutShipmentInput | DocumentUpdateManyWithWhereWithoutShipmentInput[]
    deleteMany?: DocumentScalarWhereInput | DocumentScalarWhereInput[]
  }

  export type ShipmentCreateNestedOneWithoutDocumentsInput = {
    create?: XOR<ShipmentCreateWithoutDocumentsInput, ShipmentUncheckedCreateWithoutDocumentsInput>
    connectOrCreate?: ShipmentCreateOrConnectWithoutDocumentsInput
    connect?: ShipmentWhereUniqueInput
  }

  export type EnumDocumentTypeFieldUpdateOperationsInput = {
    set?: $Enums.DocumentType
  }

  export type ShipmentUpdateOneRequiredWithoutDocumentsNestedInput = {
    create?: XOR<ShipmentCreateWithoutDocumentsInput, ShipmentUncheckedCreateWithoutDocumentsInput>
    connectOrCreate?: ShipmentCreateOrConnectWithoutDocumentsInput
    upsert?: ShipmentUpsertWithoutDocumentsInput
    connect?: ShipmentWhereUniqueInput
    update?: XOR<XOR<ShipmentUpdateToOneWithWhereWithoutDocumentsInput, ShipmentUpdateWithoutDocumentsInput>, ShipmentUncheckedUpdateWithoutDocumentsInput>
  }

  export type ResetTokenCreateNestedManyWithoutUserInput = {
    create?: XOR<ResetTokenCreateWithoutUserInput, ResetTokenUncheckedCreateWithoutUserInput> | ResetTokenCreateWithoutUserInput[] | ResetTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ResetTokenCreateOrConnectWithoutUserInput | ResetTokenCreateOrConnectWithoutUserInput[]
    createMany?: ResetTokenCreateManyUserInputEnvelope
    connect?: ResetTokenWhereUniqueInput | ResetTokenWhereUniqueInput[]
  }

  export type ActivityLogCreateNestedManyWithoutUserInput = {
    create?: XOR<ActivityLogCreateWithoutUserInput, ActivityLogUncheckedCreateWithoutUserInput> | ActivityLogCreateWithoutUserInput[] | ActivityLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ActivityLogCreateOrConnectWithoutUserInput | ActivityLogCreateOrConnectWithoutUserInput[]
    createMany?: ActivityLogCreateManyUserInputEnvelope
    connect?: ActivityLogWhereUniqueInput | ActivityLogWhereUniqueInput[]
  }

  export type ResetTokenUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ResetTokenCreateWithoutUserInput, ResetTokenUncheckedCreateWithoutUserInput> | ResetTokenCreateWithoutUserInput[] | ResetTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ResetTokenCreateOrConnectWithoutUserInput | ResetTokenCreateOrConnectWithoutUserInput[]
    createMany?: ResetTokenCreateManyUserInputEnvelope
    connect?: ResetTokenWhereUniqueInput | ResetTokenWhereUniqueInput[]
  }

  export type ActivityLogUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ActivityLogCreateWithoutUserInput, ActivityLogUncheckedCreateWithoutUserInput> | ActivityLogCreateWithoutUserInput[] | ActivityLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ActivityLogCreateOrConnectWithoutUserInput | ActivityLogCreateOrConnectWithoutUserInput[]
    createMany?: ActivityLogCreateManyUserInputEnvelope
    connect?: ActivityLogWhereUniqueInput | ActivityLogWhereUniqueInput[]
  }

  export type ResetTokenUpdateManyWithoutUserNestedInput = {
    create?: XOR<ResetTokenCreateWithoutUserInput, ResetTokenUncheckedCreateWithoutUserInput> | ResetTokenCreateWithoutUserInput[] | ResetTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ResetTokenCreateOrConnectWithoutUserInput | ResetTokenCreateOrConnectWithoutUserInput[]
    upsert?: ResetTokenUpsertWithWhereUniqueWithoutUserInput | ResetTokenUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ResetTokenCreateManyUserInputEnvelope
    set?: ResetTokenWhereUniqueInput | ResetTokenWhereUniqueInput[]
    disconnect?: ResetTokenWhereUniqueInput | ResetTokenWhereUniqueInput[]
    delete?: ResetTokenWhereUniqueInput | ResetTokenWhereUniqueInput[]
    connect?: ResetTokenWhereUniqueInput | ResetTokenWhereUniqueInput[]
    update?: ResetTokenUpdateWithWhereUniqueWithoutUserInput | ResetTokenUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ResetTokenUpdateManyWithWhereWithoutUserInput | ResetTokenUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ResetTokenScalarWhereInput | ResetTokenScalarWhereInput[]
  }

  export type ActivityLogUpdateManyWithoutUserNestedInput = {
    create?: XOR<ActivityLogCreateWithoutUserInput, ActivityLogUncheckedCreateWithoutUserInput> | ActivityLogCreateWithoutUserInput[] | ActivityLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ActivityLogCreateOrConnectWithoutUserInput | ActivityLogCreateOrConnectWithoutUserInput[]
    upsert?: ActivityLogUpsertWithWhereUniqueWithoutUserInput | ActivityLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ActivityLogCreateManyUserInputEnvelope
    set?: ActivityLogWhereUniqueInput | ActivityLogWhereUniqueInput[]
    disconnect?: ActivityLogWhereUniqueInput | ActivityLogWhereUniqueInput[]
    delete?: ActivityLogWhereUniqueInput | ActivityLogWhereUniqueInput[]
    connect?: ActivityLogWhereUniqueInput | ActivityLogWhereUniqueInput[]
    update?: ActivityLogUpdateWithWhereUniqueWithoutUserInput | ActivityLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ActivityLogUpdateManyWithWhereWithoutUserInput | ActivityLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ActivityLogScalarWhereInput | ActivityLogScalarWhereInput[]
  }

  export type ResetTokenUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ResetTokenCreateWithoutUserInput, ResetTokenUncheckedCreateWithoutUserInput> | ResetTokenCreateWithoutUserInput[] | ResetTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ResetTokenCreateOrConnectWithoutUserInput | ResetTokenCreateOrConnectWithoutUserInput[]
    upsert?: ResetTokenUpsertWithWhereUniqueWithoutUserInput | ResetTokenUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ResetTokenCreateManyUserInputEnvelope
    set?: ResetTokenWhereUniqueInput | ResetTokenWhereUniqueInput[]
    disconnect?: ResetTokenWhereUniqueInput | ResetTokenWhereUniqueInput[]
    delete?: ResetTokenWhereUniqueInput | ResetTokenWhereUniqueInput[]
    connect?: ResetTokenWhereUniqueInput | ResetTokenWhereUniqueInput[]
    update?: ResetTokenUpdateWithWhereUniqueWithoutUserInput | ResetTokenUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ResetTokenUpdateManyWithWhereWithoutUserInput | ResetTokenUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ResetTokenScalarWhereInput | ResetTokenScalarWhereInput[]
  }

  export type ActivityLogUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ActivityLogCreateWithoutUserInput, ActivityLogUncheckedCreateWithoutUserInput> | ActivityLogCreateWithoutUserInput[] | ActivityLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ActivityLogCreateOrConnectWithoutUserInput | ActivityLogCreateOrConnectWithoutUserInput[]
    upsert?: ActivityLogUpsertWithWhereUniqueWithoutUserInput | ActivityLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ActivityLogCreateManyUserInputEnvelope
    set?: ActivityLogWhereUniqueInput | ActivityLogWhereUniqueInput[]
    disconnect?: ActivityLogWhereUniqueInput | ActivityLogWhereUniqueInput[]
    delete?: ActivityLogWhereUniqueInput | ActivityLogWhereUniqueInput[]
    connect?: ActivityLogWhereUniqueInput | ActivityLogWhereUniqueInput[]
    update?: ActivityLogUpdateWithWhereUniqueWithoutUserInput | ActivityLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ActivityLogUpdateManyWithWhereWithoutUserInput | ActivityLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ActivityLogScalarWhereInput | ActivityLogScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutResetTokensInput = {
    create?: XOR<UserCreateWithoutResetTokensInput, UserUncheckedCreateWithoutResetTokensInput>
    connectOrCreate?: UserCreateOrConnectWithoutResetTokensInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutResetTokensNestedInput = {
    create?: XOR<UserCreateWithoutResetTokensInput, UserUncheckedCreateWithoutResetTokensInput>
    connectOrCreate?: UserCreateOrConnectWithoutResetTokensInput
    upsert?: UserUpsertWithoutResetTokensInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutResetTokensInput, UserUpdateWithoutResetTokensInput>, UserUncheckedUpdateWithoutResetTokensInput>
  }

  export type UserCreateNestedOneWithoutActivityLogsInput = {
    create?: XOR<UserCreateWithoutActivityLogsInput, UserUncheckedCreateWithoutActivityLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutActivityLogsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutActivityLogsNestedInput = {
    create?: XOR<UserCreateWithoutActivityLogsInput, UserUncheckedCreateWithoutActivityLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutActivityLogsInput
    upsert?: UserUpsertWithoutActivityLogsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutActivityLogsInput, UserUpdateWithoutActivityLogsInput>, UserUncheckedUpdateWithoutActivityLogsInput>
  }

  export type WellDocumentCreateNestedManyWithoutShipmentInput = {
    create?: XOR<WellDocumentCreateWithoutShipmentInput, WellDocumentUncheckedCreateWithoutShipmentInput> | WellDocumentCreateWithoutShipmentInput[] | WellDocumentUncheckedCreateWithoutShipmentInput[]
    connectOrCreate?: WellDocumentCreateOrConnectWithoutShipmentInput | WellDocumentCreateOrConnectWithoutShipmentInput[]
    createMany?: WellDocumentCreateManyShipmentInputEnvelope
    connect?: WellDocumentWhereUniqueInput | WellDocumentWhereUniqueInput[]
  }

  export type WellContainerCreateNestedManyWithoutShipmentInput = {
    create?: XOR<WellContainerCreateWithoutShipmentInput, WellContainerUncheckedCreateWithoutShipmentInput> | WellContainerCreateWithoutShipmentInput[] | WellContainerUncheckedCreateWithoutShipmentInput[]
    connectOrCreate?: WellContainerCreateOrConnectWithoutShipmentInput | WellContainerCreateOrConnectWithoutShipmentInput[]
    createMany?: WellContainerCreateManyShipmentInputEnvelope
    connect?: WellContainerWhereUniqueInput | WellContainerWhereUniqueInput[]
  }

  export type WellEventCreateNestedManyWithoutShipmentInput = {
    create?: XOR<WellEventCreateWithoutShipmentInput, WellEventUncheckedCreateWithoutShipmentInput> | WellEventCreateWithoutShipmentInput[] | WellEventUncheckedCreateWithoutShipmentInput[]
    connectOrCreate?: WellEventCreateOrConnectWithoutShipmentInput | WellEventCreateOrConnectWithoutShipmentInput[]
    createMany?: WellEventCreateManyShipmentInputEnvelope
    connect?: WellEventWhereUniqueInput | WellEventWhereUniqueInput[]
  }

  export type WellExceptionCreateNestedManyWithoutShipmentInput = {
    create?: XOR<WellExceptionCreateWithoutShipmentInput, WellExceptionUncheckedCreateWithoutShipmentInput> | WellExceptionCreateWithoutShipmentInput[] | WellExceptionUncheckedCreateWithoutShipmentInput[]
    connectOrCreate?: WellExceptionCreateOrConnectWithoutShipmentInput | WellExceptionCreateOrConnectWithoutShipmentInput[]
    createMany?: WellExceptionCreateManyShipmentInputEnvelope
    connect?: WellExceptionWhereUniqueInput | WellExceptionWhereUniqueInput[]
  }

  export type WellShipmentNoteCreateNestedManyWithoutShipmentInput = {
    create?: XOR<WellShipmentNoteCreateWithoutShipmentInput, WellShipmentNoteUncheckedCreateWithoutShipmentInput> | WellShipmentNoteCreateWithoutShipmentInput[] | WellShipmentNoteUncheckedCreateWithoutShipmentInput[]
    connectOrCreate?: WellShipmentNoteCreateOrConnectWithoutShipmentInput | WellShipmentNoteCreateOrConnectWithoutShipmentInput[]
    createMany?: WellShipmentNoteCreateManyShipmentInputEnvelope
    connect?: WellShipmentNoteWhereUniqueInput | WellShipmentNoteWhereUniqueInput[]
  }

  export type WellDocumentUncheckedCreateNestedManyWithoutShipmentInput = {
    create?: XOR<WellDocumentCreateWithoutShipmentInput, WellDocumentUncheckedCreateWithoutShipmentInput> | WellDocumentCreateWithoutShipmentInput[] | WellDocumentUncheckedCreateWithoutShipmentInput[]
    connectOrCreate?: WellDocumentCreateOrConnectWithoutShipmentInput | WellDocumentCreateOrConnectWithoutShipmentInput[]
    createMany?: WellDocumentCreateManyShipmentInputEnvelope
    connect?: WellDocumentWhereUniqueInput | WellDocumentWhereUniqueInput[]
  }

  export type WellContainerUncheckedCreateNestedManyWithoutShipmentInput = {
    create?: XOR<WellContainerCreateWithoutShipmentInput, WellContainerUncheckedCreateWithoutShipmentInput> | WellContainerCreateWithoutShipmentInput[] | WellContainerUncheckedCreateWithoutShipmentInput[]
    connectOrCreate?: WellContainerCreateOrConnectWithoutShipmentInput | WellContainerCreateOrConnectWithoutShipmentInput[]
    createMany?: WellContainerCreateManyShipmentInputEnvelope
    connect?: WellContainerWhereUniqueInput | WellContainerWhereUniqueInput[]
  }

  export type WellEventUncheckedCreateNestedManyWithoutShipmentInput = {
    create?: XOR<WellEventCreateWithoutShipmentInput, WellEventUncheckedCreateWithoutShipmentInput> | WellEventCreateWithoutShipmentInput[] | WellEventUncheckedCreateWithoutShipmentInput[]
    connectOrCreate?: WellEventCreateOrConnectWithoutShipmentInput | WellEventCreateOrConnectWithoutShipmentInput[]
    createMany?: WellEventCreateManyShipmentInputEnvelope
    connect?: WellEventWhereUniqueInput | WellEventWhereUniqueInput[]
  }

  export type WellExceptionUncheckedCreateNestedManyWithoutShipmentInput = {
    create?: XOR<WellExceptionCreateWithoutShipmentInput, WellExceptionUncheckedCreateWithoutShipmentInput> | WellExceptionCreateWithoutShipmentInput[] | WellExceptionUncheckedCreateWithoutShipmentInput[]
    connectOrCreate?: WellExceptionCreateOrConnectWithoutShipmentInput | WellExceptionCreateOrConnectWithoutShipmentInput[]
    createMany?: WellExceptionCreateManyShipmentInputEnvelope
    connect?: WellExceptionWhereUniqueInput | WellExceptionWhereUniqueInput[]
  }

  export type WellShipmentNoteUncheckedCreateNestedManyWithoutShipmentInput = {
    create?: XOR<WellShipmentNoteCreateWithoutShipmentInput, WellShipmentNoteUncheckedCreateWithoutShipmentInput> | WellShipmentNoteCreateWithoutShipmentInput[] | WellShipmentNoteUncheckedCreateWithoutShipmentInput[]
    connectOrCreate?: WellShipmentNoteCreateOrConnectWithoutShipmentInput | WellShipmentNoteCreateOrConnectWithoutShipmentInput[]
    createMany?: WellShipmentNoteCreateManyShipmentInputEnvelope
    connect?: WellShipmentNoteWhereUniqueInput | WellShipmentNoteWhereUniqueInput[]
  }

  export type EnumWellShipmentStatusFieldUpdateOperationsInput = {
    set?: $Enums.WellShipmentStatus
  }

  export type WellDocumentUpdateManyWithoutShipmentNestedInput = {
    create?: XOR<WellDocumentCreateWithoutShipmentInput, WellDocumentUncheckedCreateWithoutShipmentInput> | WellDocumentCreateWithoutShipmentInput[] | WellDocumentUncheckedCreateWithoutShipmentInput[]
    connectOrCreate?: WellDocumentCreateOrConnectWithoutShipmentInput | WellDocumentCreateOrConnectWithoutShipmentInput[]
    upsert?: WellDocumentUpsertWithWhereUniqueWithoutShipmentInput | WellDocumentUpsertWithWhereUniqueWithoutShipmentInput[]
    createMany?: WellDocumentCreateManyShipmentInputEnvelope
    set?: WellDocumentWhereUniqueInput | WellDocumentWhereUniqueInput[]
    disconnect?: WellDocumentWhereUniqueInput | WellDocumentWhereUniqueInput[]
    delete?: WellDocumentWhereUniqueInput | WellDocumentWhereUniqueInput[]
    connect?: WellDocumentWhereUniqueInput | WellDocumentWhereUniqueInput[]
    update?: WellDocumentUpdateWithWhereUniqueWithoutShipmentInput | WellDocumentUpdateWithWhereUniqueWithoutShipmentInput[]
    updateMany?: WellDocumentUpdateManyWithWhereWithoutShipmentInput | WellDocumentUpdateManyWithWhereWithoutShipmentInput[]
    deleteMany?: WellDocumentScalarWhereInput | WellDocumentScalarWhereInput[]
  }

  export type WellContainerUpdateManyWithoutShipmentNestedInput = {
    create?: XOR<WellContainerCreateWithoutShipmentInput, WellContainerUncheckedCreateWithoutShipmentInput> | WellContainerCreateWithoutShipmentInput[] | WellContainerUncheckedCreateWithoutShipmentInput[]
    connectOrCreate?: WellContainerCreateOrConnectWithoutShipmentInput | WellContainerCreateOrConnectWithoutShipmentInput[]
    upsert?: WellContainerUpsertWithWhereUniqueWithoutShipmentInput | WellContainerUpsertWithWhereUniqueWithoutShipmentInput[]
    createMany?: WellContainerCreateManyShipmentInputEnvelope
    set?: WellContainerWhereUniqueInput | WellContainerWhereUniqueInput[]
    disconnect?: WellContainerWhereUniqueInput | WellContainerWhereUniqueInput[]
    delete?: WellContainerWhereUniqueInput | WellContainerWhereUniqueInput[]
    connect?: WellContainerWhereUniqueInput | WellContainerWhereUniqueInput[]
    update?: WellContainerUpdateWithWhereUniqueWithoutShipmentInput | WellContainerUpdateWithWhereUniqueWithoutShipmentInput[]
    updateMany?: WellContainerUpdateManyWithWhereWithoutShipmentInput | WellContainerUpdateManyWithWhereWithoutShipmentInput[]
    deleteMany?: WellContainerScalarWhereInput | WellContainerScalarWhereInput[]
  }

  export type WellEventUpdateManyWithoutShipmentNestedInput = {
    create?: XOR<WellEventCreateWithoutShipmentInput, WellEventUncheckedCreateWithoutShipmentInput> | WellEventCreateWithoutShipmentInput[] | WellEventUncheckedCreateWithoutShipmentInput[]
    connectOrCreate?: WellEventCreateOrConnectWithoutShipmentInput | WellEventCreateOrConnectWithoutShipmentInput[]
    upsert?: WellEventUpsertWithWhereUniqueWithoutShipmentInput | WellEventUpsertWithWhereUniqueWithoutShipmentInput[]
    createMany?: WellEventCreateManyShipmentInputEnvelope
    set?: WellEventWhereUniqueInput | WellEventWhereUniqueInput[]
    disconnect?: WellEventWhereUniqueInput | WellEventWhereUniqueInput[]
    delete?: WellEventWhereUniqueInput | WellEventWhereUniqueInput[]
    connect?: WellEventWhereUniqueInput | WellEventWhereUniqueInput[]
    update?: WellEventUpdateWithWhereUniqueWithoutShipmentInput | WellEventUpdateWithWhereUniqueWithoutShipmentInput[]
    updateMany?: WellEventUpdateManyWithWhereWithoutShipmentInput | WellEventUpdateManyWithWhereWithoutShipmentInput[]
    deleteMany?: WellEventScalarWhereInput | WellEventScalarWhereInput[]
  }

  export type WellExceptionUpdateManyWithoutShipmentNestedInput = {
    create?: XOR<WellExceptionCreateWithoutShipmentInput, WellExceptionUncheckedCreateWithoutShipmentInput> | WellExceptionCreateWithoutShipmentInput[] | WellExceptionUncheckedCreateWithoutShipmentInput[]
    connectOrCreate?: WellExceptionCreateOrConnectWithoutShipmentInput | WellExceptionCreateOrConnectWithoutShipmentInput[]
    upsert?: WellExceptionUpsertWithWhereUniqueWithoutShipmentInput | WellExceptionUpsertWithWhereUniqueWithoutShipmentInput[]
    createMany?: WellExceptionCreateManyShipmentInputEnvelope
    set?: WellExceptionWhereUniqueInput | WellExceptionWhereUniqueInput[]
    disconnect?: WellExceptionWhereUniqueInput | WellExceptionWhereUniqueInput[]
    delete?: WellExceptionWhereUniqueInput | WellExceptionWhereUniqueInput[]
    connect?: WellExceptionWhereUniqueInput | WellExceptionWhereUniqueInput[]
    update?: WellExceptionUpdateWithWhereUniqueWithoutShipmentInput | WellExceptionUpdateWithWhereUniqueWithoutShipmentInput[]
    updateMany?: WellExceptionUpdateManyWithWhereWithoutShipmentInput | WellExceptionUpdateManyWithWhereWithoutShipmentInput[]
    deleteMany?: WellExceptionScalarWhereInput | WellExceptionScalarWhereInput[]
  }

  export type WellShipmentNoteUpdateManyWithoutShipmentNestedInput = {
    create?: XOR<WellShipmentNoteCreateWithoutShipmentInput, WellShipmentNoteUncheckedCreateWithoutShipmentInput> | WellShipmentNoteCreateWithoutShipmentInput[] | WellShipmentNoteUncheckedCreateWithoutShipmentInput[]
    connectOrCreate?: WellShipmentNoteCreateOrConnectWithoutShipmentInput | WellShipmentNoteCreateOrConnectWithoutShipmentInput[]
    upsert?: WellShipmentNoteUpsertWithWhereUniqueWithoutShipmentInput | WellShipmentNoteUpsertWithWhereUniqueWithoutShipmentInput[]
    createMany?: WellShipmentNoteCreateManyShipmentInputEnvelope
    set?: WellShipmentNoteWhereUniqueInput | WellShipmentNoteWhereUniqueInput[]
    disconnect?: WellShipmentNoteWhereUniqueInput | WellShipmentNoteWhereUniqueInput[]
    delete?: WellShipmentNoteWhereUniqueInput | WellShipmentNoteWhereUniqueInput[]
    connect?: WellShipmentNoteWhereUniqueInput | WellShipmentNoteWhereUniqueInput[]
    update?: WellShipmentNoteUpdateWithWhereUniqueWithoutShipmentInput | WellShipmentNoteUpdateWithWhereUniqueWithoutShipmentInput[]
    updateMany?: WellShipmentNoteUpdateManyWithWhereWithoutShipmentInput | WellShipmentNoteUpdateManyWithWhereWithoutShipmentInput[]
    deleteMany?: WellShipmentNoteScalarWhereInput | WellShipmentNoteScalarWhereInput[]
  }

  export type WellDocumentUncheckedUpdateManyWithoutShipmentNestedInput = {
    create?: XOR<WellDocumentCreateWithoutShipmentInput, WellDocumentUncheckedCreateWithoutShipmentInput> | WellDocumentCreateWithoutShipmentInput[] | WellDocumentUncheckedCreateWithoutShipmentInput[]
    connectOrCreate?: WellDocumentCreateOrConnectWithoutShipmentInput | WellDocumentCreateOrConnectWithoutShipmentInput[]
    upsert?: WellDocumentUpsertWithWhereUniqueWithoutShipmentInput | WellDocumentUpsertWithWhereUniqueWithoutShipmentInput[]
    createMany?: WellDocumentCreateManyShipmentInputEnvelope
    set?: WellDocumentWhereUniqueInput | WellDocumentWhereUniqueInput[]
    disconnect?: WellDocumentWhereUniqueInput | WellDocumentWhereUniqueInput[]
    delete?: WellDocumentWhereUniqueInput | WellDocumentWhereUniqueInput[]
    connect?: WellDocumentWhereUniqueInput | WellDocumentWhereUniqueInput[]
    update?: WellDocumentUpdateWithWhereUniqueWithoutShipmentInput | WellDocumentUpdateWithWhereUniqueWithoutShipmentInput[]
    updateMany?: WellDocumentUpdateManyWithWhereWithoutShipmentInput | WellDocumentUpdateManyWithWhereWithoutShipmentInput[]
    deleteMany?: WellDocumentScalarWhereInput | WellDocumentScalarWhereInput[]
  }

  export type WellContainerUncheckedUpdateManyWithoutShipmentNestedInput = {
    create?: XOR<WellContainerCreateWithoutShipmentInput, WellContainerUncheckedCreateWithoutShipmentInput> | WellContainerCreateWithoutShipmentInput[] | WellContainerUncheckedCreateWithoutShipmentInput[]
    connectOrCreate?: WellContainerCreateOrConnectWithoutShipmentInput | WellContainerCreateOrConnectWithoutShipmentInput[]
    upsert?: WellContainerUpsertWithWhereUniqueWithoutShipmentInput | WellContainerUpsertWithWhereUniqueWithoutShipmentInput[]
    createMany?: WellContainerCreateManyShipmentInputEnvelope
    set?: WellContainerWhereUniqueInput | WellContainerWhereUniqueInput[]
    disconnect?: WellContainerWhereUniqueInput | WellContainerWhereUniqueInput[]
    delete?: WellContainerWhereUniqueInput | WellContainerWhereUniqueInput[]
    connect?: WellContainerWhereUniqueInput | WellContainerWhereUniqueInput[]
    update?: WellContainerUpdateWithWhereUniqueWithoutShipmentInput | WellContainerUpdateWithWhereUniqueWithoutShipmentInput[]
    updateMany?: WellContainerUpdateManyWithWhereWithoutShipmentInput | WellContainerUpdateManyWithWhereWithoutShipmentInput[]
    deleteMany?: WellContainerScalarWhereInput | WellContainerScalarWhereInput[]
  }

  export type WellEventUncheckedUpdateManyWithoutShipmentNestedInput = {
    create?: XOR<WellEventCreateWithoutShipmentInput, WellEventUncheckedCreateWithoutShipmentInput> | WellEventCreateWithoutShipmentInput[] | WellEventUncheckedCreateWithoutShipmentInput[]
    connectOrCreate?: WellEventCreateOrConnectWithoutShipmentInput | WellEventCreateOrConnectWithoutShipmentInput[]
    upsert?: WellEventUpsertWithWhereUniqueWithoutShipmentInput | WellEventUpsertWithWhereUniqueWithoutShipmentInput[]
    createMany?: WellEventCreateManyShipmentInputEnvelope
    set?: WellEventWhereUniqueInput | WellEventWhereUniqueInput[]
    disconnect?: WellEventWhereUniqueInput | WellEventWhereUniqueInput[]
    delete?: WellEventWhereUniqueInput | WellEventWhereUniqueInput[]
    connect?: WellEventWhereUniqueInput | WellEventWhereUniqueInput[]
    update?: WellEventUpdateWithWhereUniqueWithoutShipmentInput | WellEventUpdateWithWhereUniqueWithoutShipmentInput[]
    updateMany?: WellEventUpdateManyWithWhereWithoutShipmentInput | WellEventUpdateManyWithWhereWithoutShipmentInput[]
    deleteMany?: WellEventScalarWhereInput | WellEventScalarWhereInput[]
  }

  export type WellExceptionUncheckedUpdateManyWithoutShipmentNestedInput = {
    create?: XOR<WellExceptionCreateWithoutShipmentInput, WellExceptionUncheckedCreateWithoutShipmentInput> | WellExceptionCreateWithoutShipmentInput[] | WellExceptionUncheckedCreateWithoutShipmentInput[]
    connectOrCreate?: WellExceptionCreateOrConnectWithoutShipmentInput | WellExceptionCreateOrConnectWithoutShipmentInput[]
    upsert?: WellExceptionUpsertWithWhereUniqueWithoutShipmentInput | WellExceptionUpsertWithWhereUniqueWithoutShipmentInput[]
    createMany?: WellExceptionCreateManyShipmentInputEnvelope
    set?: WellExceptionWhereUniqueInput | WellExceptionWhereUniqueInput[]
    disconnect?: WellExceptionWhereUniqueInput | WellExceptionWhereUniqueInput[]
    delete?: WellExceptionWhereUniqueInput | WellExceptionWhereUniqueInput[]
    connect?: WellExceptionWhereUniqueInput | WellExceptionWhereUniqueInput[]
    update?: WellExceptionUpdateWithWhereUniqueWithoutShipmentInput | WellExceptionUpdateWithWhereUniqueWithoutShipmentInput[]
    updateMany?: WellExceptionUpdateManyWithWhereWithoutShipmentInput | WellExceptionUpdateManyWithWhereWithoutShipmentInput[]
    deleteMany?: WellExceptionScalarWhereInput | WellExceptionScalarWhereInput[]
  }

  export type WellShipmentNoteUncheckedUpdateManyWithoutShipmentNestedInput = {
    create?: XOR<WellShipmentNoteCreateWithoutShipmentInput, WellShipmentNoteUncheckedCreateWithoutShipmentInput> | WellShipmentNoteCreateWithoutShipmentInput[] | WellShipmentNoteUncheckedCreateWithoutShipmentInput[]
    connectOrCreate?: WellShipmentNoteCreateOrConnectWithoutShipmentInput | WellShipmentNoteCreateOrConnectWithoutShipmentInput[]
    upsert?: WellShipmentNoteUpsertWithWhereUniqueWithoutShipmentInput | WellShipmentNoteUpsertWithWhereUniqueWithoutShipmentInput[]
    createMany?: WellShipmentNoteCreateManyShipmentInputEnvelope
    set?: WellShipmentNoteWhereUniqueInput | WellShipmentNoteWhereUniqueInput[]
    disconnect?: WellShipmentNoteWhereUniqueInput | WellShipmentNoteWhereUniqueInput[]
    delete?: WellShipmentNoteWhereUniqueInput | WellShipmentNoteWhereUniqueInput[]
    connect?: WellShipmentNoteWhereUniqueInput | WellShipmentNoteWhereUniqueInput[]
    update?: WellShipmentNoteUpdateWithWhereUniqueWithoutShipmentInput | WellShipmentNoteUpdateWithWhereUniqueWithoutShipmentInput[]
    updateMany?: WellShipmentNoteUpdateManyWithWhereWithoutShipmentInput | WellShipmentNoteUpdateManyWithWhereWithoutShipmentInput[]
    deleteMany?: WellShipmentNoteScalarWhereInput | WellShipmentNoteScalarWhereInput[]
  }

  export type WellShipmentCreateNestedOneWithoutEventsInput = {
    create?: XOR<WellShipmentCreateWithoutEventsInput, WellShipmentUncheckedCreateWithoutEventsInput>
    connectOrCreate?: WellShipmentCreateOrConnectWithoutEventsInput
    connect?: WellShipmentWhereUniqueInput
  }

  export type WellShipmentUpdateOneRequiredWithoutEventsNestedInput = {
    create?: XOR<WellShipmentCreateWithoutEventsInput, WellShipmentUncheckedCreateWithoutEventsInput>
    connectOrCreate?: WellShipmentCreateOrConnectWithoutEventsInput
    upsert?: WellShipmentUpsertWithoutEventsInput
    connect?: WellShipmentWhereUniqueInput
    update?: XOR<XOR<WellShipmentUpdateToOneWithWhereWithoutEventsInput, WellShipmentUpdateWithoutEventsInput>, WellShipmentUncheckedUpdateWithoutEventsInput>
  }

  export type WellShipmentCreateNestedOneWithoutExceptionsInput = {
    create?: XOR<WellShipmentCreateWithoutExceptionsInput, WellShipmentUncheckedCreateWithoutExceptionsInput>
    connectOrCreate?: WellShipmentCreateOrConnectWithoutExceptionsInput
    connect?: WellShipmentWhereUniqueInput
  }

  export type WellShipmentUpdateOneRequiredWithoutExceptionsNestedInput = {
    create?: XOR<WellShipmentCreateWithoutExceptionsInput, WellShipmentUncheckedCreateWithoutExceptionsInput>
    connectOrCreate?: WellShipmentCreateOrConnectWithoutExceptionsInput
    upsert?: WellShipmentUpsertWithoutExceptionsInput
    connect?: WellShipmentWhereUniqueInput
    update?: XOR<XOR<WellShipmentUpdateToOneWithWhereWithoutExceptionsInput, WellShipmentUpdateWithoutExceptionsInput>, WellShipmentUncheckedUpdateWithoutExceptionsInput>
  }

  export type WellShipmentCreateNestedOneWithoutContainersInput = {
    create?: XOR<WellShipmentCreateWithoutContainersInput, WellShipmentUncheckedCreateWithoutContainersInput>
    connectOrCreate?: WellShipmentCreateOrConnectWithoutContainersInput
    connect?: WellShipmentWhereUniqueInput
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type WellShipmentUpdateOneRequiredWithoutContainersNestedInput = {
    create?: XOR<WellShipmentCreateWithoutContainersInput, WellShipmentUncheckedCreateWithoutContainersInput>
    connectOrCreate?: WellShipmentCreateOrConnectWithoutContainersInput
    upsert?: WellShipmentUpsertWithoutContainersInput
    connect?: WellShipmentWhereUniqueInput
    update?: XOR<XOR<WellShipmentUpdateToOneWithWhereWithoutContainersInput, WellShipmentUpdateWithoutContainersInput>, WellShipmentUncheckedUpdateWithoutContainersInput>
  }

  export type WellShipmentCreateNestedOneWithoutDocumentsInput = {
    create?: XOR<WellShipmentCreateWithoutDocumentsInput, WellShipmentUncheckedCreateWithoutDocumentsInput>
    connectOrCreate?: WellShipmentCreateOrConnectWithoutDocumentsInput
    connect?: WellShipmentWhereUniqueInput
  }

  export type WellShipmentUpdateOneRequiredWithoutDocumentsNestedInput = {
    create?: XOR<WellShipmentCreateWithoutDocumentsInput, WellShipmentUncheckedCreateWithoutDocumentsInput>
    connectOrCreate?: WellShipmentCreateOrConnectWithoutDocumentsInput
    upsert?: WellShipmentUpsertWithoutDocumentsInput
    connect?: WellShipmentWhereUniqueInput
    update?: XOR<XOR<WellShipmentUpdateToOneWithWhereWithoutDocumentsInput, WellShipmentUpdateWithoutDocumentsInput>, WellShipmentUncheckedUpdateWithoutDocumentsInput>
  }

  export type WellShipmentCreateNestedOneWithoutNotesHistoryInput = {
    create?: XOR<WellShipmentCreateWithoutNotesHistoryInput, WellShipmentUncheckedCreateWithoutNotesHistoryInput>
    connectOrCreate?: WellShipmentCreateOrConnectWithoutNotesHistoryInput
    connect?: WellShipmentWhereUniqueInput
  }

  export type WellShipmentUpdateOneRequiredWithoutNotesHistoryNestedInput = {
    create?: XOR<WellShipmentCreateWithoutNotesHistoryInput, WellShipmentUncheckedCreateWithoutNotesHistoryInput>
    connectOrCreate?: WellShipmentCreateOrConnectWithoutNotesHistoryInput
    upsert?: WellShipmentUpsertWithoutNotesHistoryInput
    connect?: WellShipmentWhereUniqueInput
    update?: XOR<XOR<WellShipmentUpdateToOneWithWhereWithoutNotesHistoryInput, WellShipmentUpdateWithoutNotesHistoryInput>, WellShipmentUncheckedUpdateWithoutNotesHistoryInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedEnumShipmentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ShipmentStatus | EnumShipmentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ShipmentStatus[] | ListEnumShipmentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ShipmentStatus[] | ListEnumShipmentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumShipmentStatusFilter<$PrismaModel> | $Enums.ShipmentStatus
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumShipmentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ShipmentStatus | EnumShipmentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ShipmentStatus[] | ListEnumShipmentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ShipmentStatus[] | ListEnumShipmentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumShipmentStatusWithAggregatesFilter<$PrismaModel> | $Enums.ShipmentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumShipmentStatusFilter<$PrismaModel>
    _max?: NestedEnumShipmentStatusFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumDocumentTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.DocumentType | EnumDocumentTypeFieldRefInput<$PrismaModel>
    in?: $Enums.DocumentType[] | ListEnumDocumentTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.DocumentType[] | ListEnumDocumentTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumDocumentTypeFilter<$PrismaModel> | $Enums.DocumentType
  }

  export type NestedEnumDocumentTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DocumentType | EnumDocumentTypeFieldRefInput<$PrismaModel>
    in?: $Enums.DocumentType[] | ListEnumDocumentTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.DocumentType[] | ListEnumDocumentTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumDocumentTypeWithAggregatesFilter<$PrismaModel> | $Enums.DocumentType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDocumentTypeFilter<$PrismaModel>
    _max?: NestedEnumDocumentTypeFilter<$PrismaModel>
  }

  export type NestedEnumWellShipmentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.WellShipmentStatus | EnumWellShipmentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.WellShipmentStatus[] | ListEnumWellShipmentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.WellShipmentStatus[] | ListEnumWellShipmentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumWellShipmentStatusFilter<$PrismaModel> | $Enums.WellShipmentStatus
  }

  export type NestedEnumWellShipmentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.WellShipmentStatus | EnumWellShipmentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.WellShipmentStatus[] | ListEnumWellShipmentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.WellShipmentStatus[] | ListEnumWellShipmentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumWellShipmentStatusWithAggregatesFilter<$PrismaModel> | $Enums.WellShipmentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumWellShipmentStatusFilter<$PrismaModel>
    _max?: NestedEnumWellShipmentStatusFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type DocumentCreateWithoutShipmentInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    type: $Enums.DocumentType
    filename: string
    driveFileId: string
    driveUrl: string
    version?: number
    isReplaced?: boolean
  }

  export type DocumentUncheckedCreateWithoutShipmentInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    type: $Enums.DocumentType
    filename: string
    driveFileId: string
    driveUrl: string
    version?: number
    isReplaced?: boolean
  }

  export type DocumentCreateOrConnectWithoutShipmentInput = {
    where: DocumentWhereUniqueInput
    create: XOR<DocumentCreateWithoutShipmentInput, DocumentUncheckedCreateWithoutShipmentInput>
  }

  export type DocumentCreateManyShipmentInputEnvelope = {
    data: DocumentCreateManyShipmentInput | DocumentCreateManyShipmentInput[]
    skipDuplicates?: boolean
  }

  export type DocumentUpsertWithWhereUniqueWithoutShipmentInput = {
    where: DocumentWhereUniqueInput
    update: XOR<DocumentUpdateWithoutShipmentInput, DocumentUncheckedUpdateWithoutShipmentInput>
    create: XOR<DocumentCreateWithoutShipmentInput, DocumentUncheckedCreateWithoutShipmentInput>
  }

  export type DocumentUpdateWithWhereUniqueWithoutShipmentInput = {
    where: DocumentWhereUniqueInput
    data: XOR<DocumentUpdateWithoutShipmentInput, DocumentUncheckedUpdateWithoutShipmentInput>
  }

  export type DocumentUpdateManyWithWhereWithoutShipmentInput = {
    where: DocumentScalarWhereInput
    data: XOR<DocumentUpdateManyMutationInput, DocumentUncheckedUpdateManyWithoutShipmentInput>
  }

  export type DocumentScalarWhereInput = {
    AND?: DocumentScalarWhereInput | DocumentScalarWhereInput[]
    OR?: DocumentScalarWhereInput[]
    NOT?: DocumentScalarWhereInput | DocumentScalarWhereInput[]
    id?: StringFilter<"Document"> | string
    createdAt?: DateTimeFilter<"Document"> | Date | string
    updatedAt?: DateTimeFilter<"Document"> | Date | string
    shipmentId?: StringFilter<"Document"> | string
    type?: EnumDocumentTypeFilter<"Document"> | $Enums.DocumentType
    filename?: StringFilter<"Document"> | string
    driveFileId?: StringFilter<"Document"> | string
    driveUrl?: StringFilter<"Document"> | string
    version?: IntFilter<"Document"> | number
    isReplaced?: BoolFilter<"Document"> | boolean
  }

  export type ShipmentCreateWithoutDocumentsInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    clientName: string
    blNumber: string
    status?: $Enums.ShipmentStatus
    containerCount?: number
    isFeriSkipped?: boolean
    feriNumber?: string | null
    proformaNumber?: string | null
    proformaAmountEUR?: Decimal | DecimalJsLike | number | string | null
    commissionEUR?: Decimal | DecimalJsLike | number | string | null
    exchangeRate?: Decimal | DecimalJsLike | number | string | null
    adAmountUSD?: Decimal | DecimalJsLike | number | string | null
    tioNumber?: string | null
    ferriUSD?: Decimal | DecimalJsLike | number | string | null
    commUSD?: Decimal | DecimalJsLike | number | string | null
    totalUSD?: Decimal | DecimalJsLike | number | string | null
    wellRevenue?: Decimal | DecimalJsLike | number | string | null
    musungoRevenue?: Decimal | DecimalJsLike | number | string | null
    ogefremRevenue?: Decimal | DecimalJsLike | number | string | null
    invoiceNumber?: string | null
    invoiceDate?: Date | string | null
    vesselName?: string | null
    entryNumber?: string | null
    roeKsh?: Decimal | DecimalJsLike | number | string | null
    hsCode?: string | null
    preparedBy?: string | null
    cuInvoiceNumber?: string | null
    qrCodeUrl?: string | null
    cuDateTime?: Date | string | null
    cuSerialNumber?: string | null
    customerPin?: string | null
  }

  export type ShipmentUncheckedCreateWithoutDocumentsInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    clientName: string
    blNumber: string
    status?: $Enums.ShipmentStatus
    containerCount?: number
    isFeriSkipped?: boolean
    feriNumber?: string | null
    proformaNumber?: string | null
    proformaAmountEUR?: Decimal | DecimalJsLike | number | string | null
    commissionEUR?: Decimal | DecimalJsLike | number | string | null
    exchangeRate?: Decimal | DecimalJsLike | number | string | null
    adAmountUSD?: Decimal | DecimalJsLike | number | string | null
    tioNumber?: string | null
    ferriUSD?: Decimal | DecimalJsLike | number | string | null
    commUSD?: Decimal | DecimalJsLike | number | string | null
    totalUSD?: Decimal | DecimalJsLike | number | string | null
    wellRevenue?: Decimal | DecimalJsLike | number | string | null
    musungoRevenue?: Decimal | DecimalJsLike | number | string | null
    ogefremRevenue?: Decimal | DecimalJsLike | number | string | null
    invoiceNumber?: string | null
    invoiceDate?: Date | string | null
    vesselName?: string | null
    entryNumber?: string | null
    roeKsh?: Decimal | DecimalJsLike | number | string | null
    hsCode?: string | null
    preparedBy?: string | null
    cuInvoiceNumber?: string | null
    qrCodeUrl?: string | null
    cuDateTime?: Date | string | null
    cuSerialNumber?: string | null
    customerPin?: string | null
  }

  export type ShipmentCreateOrConnectWithoutDocumentsInput = {
    where: ShipmentWhereUniqueInput
    create: XOR<ShipmentCreateWithoutDocumentsInput, ShipmentUncheckedCreateWithoutDocumentsInput>
  }

  export type ShipmentUpsertWithoutDocumentsInput = {
    update: XOR<ShipmentUpdateWithoutDocumentsInput, ShipmentUncheckedUpdateWithoutDocumentsInput>
    create: XOR<ShipmentCreateWithoutDocumentsInput, ShipmentUncheckedCreateWithoutDocumentsInput>
    where?: ShipmentWhereInput
  }

  export type ShipmentUpdateToOneWithWhereWithoutDocumentsInput = {
    where?: ShipmentWhereInput
    data: XOR<ShipmentUpdateWithoutDocumentsInput, ShipmentUncheckedUpdateWithoutDocumentsInput>
  }

  export type ShipmentUpdateWithoutDocumentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clientName?: StringFieldUpdateOperationsInput | string
    blNumber?: StringFieldUpdateOperationsInput | string
    status?: EnumShipmentStatusFieldUpdateOperationsInput | $Enums.ShipmentStatus
    containerCount?: IntFieldUpdateOperationsInput | number
    isFeriSkipped?: BoolFieldUpdateOperationsInput | boolean
    feriNumber?: NullableStringFieldUpdateOperationsInput | string | null
    proformaNumber?: NullableStringFieldUpdateOperationsInput | string | null
    proformaAmountEUR?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    commissionEUR?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    exchangeRate?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    adAmountUSD?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    tioNumber?: NullableStringFieldUpdateOperationsInput | string | null
    ferriUSD?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    commUSD?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    totalUSD?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    wellRevenue?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    musungoRevenue?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    ogefremRevenue?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    invoiceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    invoiceDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    vesselName?: NullableStringFieldUpdateOperationsInput | string | null
    entryNumber?: NullableStringFieldUpdateOperationsInput | string | null
    roeKsh?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    hsCode?: NullableStringFieldUpdateOperationsInput | string | null
    preparedBy?: NullableStringFieldUpdateOperationsInput | string | null
    cuInvoiceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    qrCodeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    cuDateTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cuSerialNumber?: NullableStringFieldUpdateOperationsInput | string | null
    customerPin?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ShipmentUncheckedUpdateWithoutDocumentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clientName?: StringFieldUpdateOperationsInput | string
    blNumber?: StringFieldUpdateOperationsInput | string
    status?: EnumShipmentStatusFieldUpdateOperationsInput | $Enums.ShipmentStatus
    containerCount?: IntFieldUpdateOperationsInput | number
    isFeriSkipped?: BoolFieldUpdateOperationsInput | boolean
    feriNumber?: NullableStringFieldUpdateOperationsInput | string | null
    proformaNumber?: NullableStringFieldUpdateOperationsInput | string | null
    proformaAmountEUR?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    commissionEUR?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    exchangeRate?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    adAmountUSD?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    tioNumber?: NullableStringFieldUpdateOperationsInput | string | null
    ferriUSD?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    commUSD?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    totalUSD?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    wellRevenue?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    musungoRevenue?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    ogefremRevenue?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    invoiceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    invoiceDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    vesselName?: NullableStringFieldUpdateOperationsInput | string | null
    entryNumber?: NullableStringFieldUpdateOperationsInput | string | null
    roeKsh?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    hsCode?: NullableStringFieldUpdateOperationsInput | string | null
    preparedBy?: NullableStringFieldUpdateOperationsInput | string | null
    cuInvoiceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    qrCodeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    cuDateTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cuSerialNumber?: NullableStringFieldUpdateOperationsInput | string | null
    customerPin?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ResetTokenCreateWithoutUserInput = {
    id?: string
    token: string
    expires: Date | string
    createdAt?: Date | string
  }

  export type ResetTokenUncheckedCreateWithoutUserInput = {
    id?: string
    token: string
    expires: Date | string
    createdAt?: Date | string
  }

  export type ResetTokenCreateOrConnectWithoutUserInput = {
    where: ResetTokenWhereUniqueInput
    create: XOR<ResetTokenCreateWithoutUserInput, ResetTokenUncheckedCreateWithoutUserInput>
  }

  export type ResetTokenCreateManyUserInputEnvelope = {
    data: ResetTokenCreateManyUserInput | ResetTokenCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ActivityLogCreateWithoutUserInput = {
    id?: string
    createdAt?: Date | string
    action: string
    entity: string
    entityId?: string | null
    detail?: string | null
  }

  export type ActivityLogUncheckedCreateWithoutUserInput = {
    id?: string
    createdAt?: Date | string
    action: string
    entity: string
    entityId?: string | null
    detail?: string | null
  }

  export type ActivityLogCreateOrConnectWithoutUserInput = {
    where: ActivityLogWhereUniqueInput
    create: XOR<ActivityLogCreateWithoutUserInput, ActivityLogUncheckedCreateWithoutUserInput>
  }

  export type ActivityLogCreateManyUserInputEnvelope = {
    data: ActivityLogCreateManyUserInput | ActivityLogCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ResetTokenUpsertWithWhereUniqueWithoutUserInput = {
    where: ResetTokenWhereUniqueInput
    update: XOR<ResetTokenUpdateWithoutUserInput, ResetTokenUncheckedUpdateWithoutUserInput>
    create: XOR<ResetTokenCreateWithoutUserInput, ResetTokenUncheckedCreateWithoutUserInput>
  }

  export type ResetTokenUpdateWithWhereUniqueWithoutUserInput = {
    where: ResetTokenWhereUniqueInput
    data: XOR<ResetTokenUpdateWithoutUserInput, ResetTokenUncheckedUpdateWithoutUserInput>
  }

  export type ResetTokenUpdateManyWithWhereWithoutUserInput = {
    where: ResetTokenScalarWhereInput
    data: XOR<ResetTokenUpdateManyMutationInput, ResetTokenUncheckedUpdateManyWithoutUserInput>
  }

  export type ResetTokenScalarWhereInput = {
    AND?: ResetTokenScalarWhereInput | ResetTokenScalarWhereInput[]
    OR?: ResetTokenScalarWhereInput[]
    NOT?: ResetTokenScalarWhereInput | ResetTokenScalarWhereInput[]
    id?: StringFilter<"ResetToken"> | string
    token?: StringFilter<"ResetToken"> | string
    expires?: DateTimeFilter<"ResetToken"> | Date | string
    createdAt?: DateTimeFilter<"ResetToken"> | Date | string
    userId?: StringFilter<"ResetToken"> | string
  }

  export type ActivityLogUpsertWithWhereUniqueWithoutUserInput = {
    where: ActivityLogWhereUniqueInput
    update: XOR<ActivityLogUpdateWithoutUserInput, ActivityLogUncheckedUpdateWithoutUserInput>
    create: XOR<ActivityLogCreateWithoutUserInput, ActivityLogUncheckedCreateWithoutUserInput>
  }

  export type ActivityLogUpdateWithWhereUniqueWithoutUserInput = {
    where: ActivityLogWhereUniqueInput
    data: XOR<ActivityLogUpdateWithoutUserInput, ActivityLogUncheckedUpdateWithoutUserInput>
  }

  export type ActivityLogUpdateManyWithWhereWithoutUserInput = {
    where: ActivityLogScalarWhereInput
    data: XOR<ActivityLogUpdateManyMutationInput, ActivityLogUncheckedUpdateManyWithoutUserInput>
  }

  export type ActivityLogScalarWhereInput = {
    AND?: ActivityLogScalarWhereInput | ActivityLogScalarWhereInput[]
    OR?: ActivityLogScalarWhereInput[]
    NOT?: ActivityLogScalarWhereInput | ActivityLogScalarWhereInput[]
    id?: StringFilter<"ActivityLog"> | string
    createdAt?: DateTimeFilter<"ActivityLog"> | Date | string
    userId?: StringFilter<"ActivityLog"> | string
    action?: StringFilter<"ActivityLog"> | string
    entity?: StringFilter<"ActivityLog"> | string
    entityId?: StringNullableFilter<"ActivityLog"> | string | null
    detail?: StringNullableFilter<"ActivityLog"> | string | null
  }

  export type UserCreateWithoutResetTokensInput = {
    id?: string
    email: string
    username: string
    password: string
    role?: string
    department?: string
    isSuspended?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    activityLogs?: ActivityLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutResetTokensInput = {
    id?: string
    email: string
    username: string
    password: string
    role?: string
    department?: string
    isSuspended?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    activityLogs?: ActivityLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutResetTokensInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutResetTokensInput, UserUncheckedCreateWithoutResetTokensInput>
  }

  export type UserUpsertWithoutResetTokensInput = {
    update: XOR<UserUpdateWithoutResetTokensInput, UserUncheckedUpdateWithoutResetTokensInput>
    create: XOR<UserCreateWithoutResetTokensInput, UserUncheckedCreateWithoutResetTokensInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutResetTokensInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutResetTokensInput, UserUncheckedUpdateWithoutResetTokensInput>
  }

  export type UserUpdateWithoutResetTokensInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    isSuspended?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activityLogs?: ActivityLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutResetTokensInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    isSuspended?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activityLogs?: ActivityLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutActivityLogsInput = {
    id?: string
    email: string
    username: string
    password: string
    role?: string
    department?: string
    isSuspended?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    resetTokens?: ResetTokenCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutActivityLogsInput = {
    id?: string
    email: string
    username: string
    password: string
    role?: string
    department?: string
    isSuspended?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    resetTokens?: ResetTokenUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutActivityLogsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutActivityLogsInput, UserUncheckedCreateWithoutActivityLogsInput>
  }

  export type UserUpsertWithoutActivityLogsInput = {
    update: XOR<UserUpdateWithoutActivityLogsInput, UserUncheckedUpdateWithoutActivityLogsInput>
    create: XOR<UserCreateWithoutActivityLogsInput, UserUncheckedCreateWithoutActivityLogsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutActivityLogsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutActivityLogsInput, UserUncheckedUpdateWithoutActivityLogsInput>
  }

  export type UserUpdateWithoutActivityLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    isSuspended?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resetTokens?: ResetTokenUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutActivityLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    isSuspended?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resetTokens?: ResetTokenUncheckedUpdateManyWithoutUserNestedInput
  }

  export type WellDocumentCreateWithoutShipmentInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    filename: string
    driveFileId: string
    driveUrl: string
    docType: string
  }

  export type WellDocumentUncheckedCreateWithoutShipmentInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    filename: string
    driveFileId: string
    driveUrl: string
    docType: string
  }

  export type WellDocumentCreateOrConnectWithoutShipmentInput = {
    where: WellDocumentWhereUniqueInput
    create: XOR<WellDocumentCreateWithoutShipmentInput, WellDocumentUncheckedCreateWithoutShipmentInput>
  }

  export type WellDocumentCreateManyShipmentInputEnvelope = {
    data: WellDocumentCreateManyShipmentInput | WellDocumentCreateManyShipmentInput[]
    skipDuplicates?: boolean
  }

  export type WellContainerCreateWithoutShipmentInput = {
    id?: string
    containerNumber: string
    size?: string | null
    weight?: number | null
    dischargeDate?: Date | string | null
    gateOutDate?: Date | string | null
    truckDetails?: string | null
    driverName?: string | null
    status?: string | null
    remarks?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WellContainerUncheckedCreateWithoutShipmentInput = {
    id?: string
    containerNumber: string
    size?: string | null
    weight?: number | null
    dischargeDate?: Date | string | null
    gateOutDate?: Date | string | null
    truckDetails?: string | null
    driverName?: string | null
    status?: string | null
    remarks?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WellContainerCreateOrConnectWithoutShipmentInput = {
    where: WellContainerWhereUniqueInput
    create: XOR<WellContainerCreateWithoutShipmentInput, WellContainerUncheckedCreateWithoutShipmentInput>
  }

  export type WellContainerCreateManyShipmentInputEnvelope = {
    data: WellContainerCreateManyShipmentInput | WellContainerCreateManyShipmentInput[]
    skipDuplicates?: boolean
  }

  export type WellEventCreateWithoutShipmentInput = {
    id?: string
    title: string
    description?: string | null
    stage?: string | null
    source?: string
    updatedBy?: string
    reference?: string | null
    createdAt?: Date | string
  }

  export type WellEventUncheckedCreateWithoutShipmentInput = {
    id?: string
    title: string
    description?: string | null
    stage?: string | null
    source?: string
    updatedBy?: string
    reference?: string | null
    createdAt?: Date | string
  }

  export type WellEventCreateOrConnectWithoutShipmentInput = {
    where: WellEventWhereUniqueInput
    create: XOR<WellEventCreateWithoutShipmentInput, WellEventUncheckedCreateWithoutShipmentInput>
  }

  export type WellEventCreateManyShipmentInputEnvelope = {
    data: WellEventCreateManyShipmentInput | WellEventCreateManyShipmentInput[]
    skipDuplicates?: boolean
  }

  export type WellExceptionCreateWithoutShipmentInput = {
    id?: string
    containerId?: string | null
    issueType: string
    severity?: string
    status?: string
    description: string
    expectedResolution?: string | null
    assignedTo?: string | null
    dueDate?: Date | string | null
    createdBy?: string
    createdAt?: Date | string
    resolvedAt?: Date | string | null
    resolvedBy?: string | null
  }

  export type WellExceptionUncheckedCreateWithoutShipmentInput = {
    id?: string
    containerId?: string | null
    issueType: string
    severity?: string
    status?: string
    description: string
    expectedResolution?: string | null
    assignedTo?: string | null
    dueDate?: Date | string | null
    createdBy?: string
    createdAt?: Date | string
    resolvedAt?: Date | string | null
    resolvedBy?: string | null
  }

  export type WellExceptionCreateOrConnectWithoutShipmentInput = {
    where: WellExceptionWhereUniqueInput
    create: XOR<WellExceptionCreateWithoutShipmentInput, WellExceptionUncheckedCreateWithoutShipmentInput>
  }

  export type WellExceptionCreateManyShipmentInputEnvelope = {
    data: WellExceptionCreateManyShipmentInput | WellExceptionCreateManyShipmentInput[]
    skipDuplicates?: boolean
  }

  export type WellShipmentNoteCreateWithoutShipmentInput = {
    id?: string
    note: string
    createdBy?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WellShipmentNoteUncheckedCreateWithoutShipmentInput = {
    id?: string
    note: string
    createdBy?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WellShipmentNoteCreateOrConnectWithoutShipmentInput = {
    where: WellShipmentNoteWhereUniqueInput
    create: XOR<WellShipmentNoteCreateWithoutShipmentInput, WellShipmentNoteUncheckedCreateWithoutShipmentInput>
  }

  export type WellShipmentNoteCreateManyShipmentInputEnvelope = {
    data: WellShipmentNoteCreateManyShipmentInput | WellShipmentNoteCreateManyShipmentInput[]
    skipDuplicates?: boolean
  }

  export type WellDocumentUpsertWithWhereUniqueWithoutShipmentInput = {
    where: WellDocumentWhereUniqueInput
    update: XOR<WellDocumentUpdateWithoutShipmentInput, WellDocumentUncheckedUpdateWithoutShipmentInput>
    create: XOR<WellDocumentCreateWithoutShipmentInput, WellDocumentUncheckedCreateWithoutShipmentInput>
  }

  export type WellDocumentUpdateWithWhereUniqueWithoutShipmentInput = {
    where: WellDocumentWhereUniqueInput
    data: XOR<WellDocumentUpdateWithoutShipmentInput, WellDocumentUncheckedUpdateWithoutShipmentInput>
  }

  export type WellDocumentUpdateManyWithWhereWithoutShipmentInput = {
    where: WellDocumentScalarWhereInput
    data: XOR<WellDocumentUpdateManyMutationInput, WellDocumentUncheckedUpdateManyWithoutShipmentInput>
  }

  export type WellDocumentScalarWhereInput = {
    AND?: WellDocumentScalarWhereInput | WellDocumentScalarWhereInput[]
    OR?: WellDocumentScalarWhereInput[]
    NOT?: WellDocumentScalarWhereInput | WellDocumentScalarWhereInput[]
    id?: StringFilter<"WellDocument"> | string
    createdAt?: DateTimeFilter<"WellDocument"> | Date | string
    updatedAt?: DateTimeFilter<"WellDocument"> | Date | string
    shipmentId?: StringFilter<"WellDocument"> | string
    filename?: StringFilter<"WellDocument"> | string
    driveFileId?: StringFilter<"WellDocument"> | string
    driveUrl?: StringFilter<"WellDocument"> | string
    docType?: StringFilter<"WellDocument"> | string
  }

  export type WellContainerUpsertWithWhereUniqueWithoutShipmentInput = {
    where: WellContainerWhereUniqueInput
    update: XOR<WellContainerUpdateWithoutShipmentInput, WellContainerUncheckedUpdateWithoutShipmentInput>
    create: XOR<WellContainerCreateWithoutShipmentInput, WellContainerUncheckedCreateWithoutShipmentInput>
  }

  export type WellContainerUpdateWithWhereUniqueWithoutShipmentInput = {
    where: WellContainerWhereUniqueInput
    data: XOR<WellContainerUpdateWithoutShipmentInput, WellContainerUncheckedUpdateWithoutShipmentInput>
  }

  export type WellContainerUpdateManyWithWhereWithoutShipmentInput = {
    where: WellContainerScalarWhereInput
    data: XOR<WellContainerUpdateManyMutationInput, WellContainerUncheckedUpdateManyWithoutShipmentInput>
  }

  export type WellContainerScalarWhereInput = {
    AND?: WellContainerScalarWhereInput | WellContainerScalarWhereInput[]
    OR?: WellContainerScalarWhereInput[]
    NOT?: WellContainerScalarWhereInput | WellContainerScalarWhereInput[]
    id?: StringFilter<"WellContainer"> | string
    shipmentId?: StringFilter<"WellContainer"> | string
    containerNumber?: StringFilter<"WellContainer"> | string
    size?: StringNullableFilter<"WellContainer"> | string | null
    weight?: FloatNullableFilter<"WellContainer"> | number | null
    dischargeDate?: DateTimeNullableFilter<"WellContainer"> | Date | string | null
    gateOutDate?: DateTimeNullableFilter<"WellContainer"> | Date | string | null
    truckDetails?: StringNullableFilter<"WellContainer"> | string | null
    driverName?: StringNullableFilter<"WellContainer"> | string | null
    status?: StringNullableFilter<"WellContainer"> | string | null
    remarks?: StringNullableFilter<"WellContainer"> | string | null
    createdAt?: DateTimeFilter<"WellContainer"> | Date | string
    updatedAt?: DateTimeFilter<"WellContainer"> | Date | string
  }

  export type WellEventUpsertWithWhereUniqueWithoutShipmentInput = {
    where: WellEventWhereUniqueInput
    update: XOR<WellEventUpdateWithoutShipmentInput, WellEventUncheckedUpdateWithoutShipmentInput>
    create: XOR<WellEventCreateWithoutShipmentInput, WellEventUncheckedCreateWithoutShipmentInput>
  }

  export type WellEventUpdateWithWhereUniqueWithoutShipmentInput = {
    where: WellEventWhereUniqueInput
    data: XOR<WellEventUpdateWithoutShipmentInput, WellEventUncheckedUpdateWithoutShipmentInput>
  }

  export type WellEventUpdateManyWithWhereWithoutShipmentInput = {
    where: WellEventScalarWhereInput
    data: XOR<WellEventUpdateManyMutationInput, WellEventUncheckedUpdateManyWithoutShipmentInput>
  }

  export type WellEventScalarWhereInput = {
    AND?: WellEventScalarWhereInput | WellEventScalarWhereInput[]
    OR?: WellEventScalarWhereInput[]
    NOT?: WellEventScalarWhereInput | WellEventScalarWhereInput[]
    id?: StringFilter<"WellEvent"> | string
    shipmentId?: StringFilter<"WellEvent"> | string
    title?: StringFilter<"WellEvent"> | string
    description?: StringNullableFilter<"WellEvent"> | string | null
    stage?: StringNullableFilter<"WellEvent"> | string | null
    source?: StringFilter<"WellEvent"> | string
    updatedBy?: StringFilter<"WellEvent"> | string
    reference?: StringNullableFilter<"WellEvent"> | string | null
    createdAt?: DateTimeFilter<"WellEvent"> | Date | string
  }

  export type WellExceptionUpsertWithWhereUniqueWithoutShipmentInput = {
    where: WellExceptionWhereUniqueInput
    update: XOR<WellExceptionUpdateWithoutShipmentInput, WellExceptionUncheckedUpdateWithoutShipmentInput>
    create: XOR<WellExceptionCreateWithoutShipmentInput, WellExceptionUncheckedCreateWithoutShipmentInput>
  }

  export type WellExceptionUpdateWithWhereUniqueWithoutShipmentInput = {
    where: WellExceptionWhereUniqueInput
    data: XOR<WellExceptionUpdateWithoutShipmentInput, WellExceptionUncheckedUpdateWithoutShipmentInput>
  }

  export type WellExceptionUpdateManyWithWhereWithoutShipmentInput = {
    where: WellExceptionScalarWhereInput
    data: XOR<WellExceptionUpdateManyMutationInput, WellExceptionUncheckedUpdateManyWithoutShipmentInput>
  }

  export type WellExceptionScalarWhereInput = {
    AND?: WellExceptionScalarWhereInput | WellExceptionScalarWhereInput[]
    OR?: WellExceptionScalarWhereInput[]
    NOT?: WellExceptionScalarWhereInput | WellExceptionScalarWhereInput[]
    id?: StringFilter<"WellException"> | string
    shipmentId?: StringFilter<"WellException"> | string
    containerId?: StringNullableFilter<"WellException"> | string | null
    issueType?: StringFilter<"WellException"> | string
    severity?: StringFilter<"WellException"> | string
    status?: StringFilter<"WellException"> | string
    description?: StringFilter<"WellException"> | string
    expectedResolution?: StringNullableFilter<"WellException"> | string | null
    assignedTo?: StringNullableFilter<"WellException"> | string | null
    dueDate?: DateTimeNullableFilter<"WellException"> | Date | string | null
    createdBy?: StringFilter<"WellException"> | string
    createdAt?: DateTimeFilter<"WellException"> | Date | string
    resolvedAt?: DateTimeNullableFilter<"WellException"> | Date | string | null
    resolvedBy?: StringNullableFilter<"WellException"> | string | null
  }

  export type WellShipmentNoteUpsertWithWhereUniqueWithoutShipmentInput = {
    where: WellShipmentNoteWhereUniqueInput
    update: XOR<WellShipmentNoteUpdateWithoutShipmentInput, WellShipmentNoteUncheckedUpdateWithoutShipmentInput>
    create: XOR<WellShipmentNoteCreateWithoutShipmentInput, WellShipmentNoteUncheckedCreateWithoutShipmentInput>
  }

  export type WellShipmentNoteUpdateWithWhereUniqueWithoutShipmentInput = {
    where: WellShipmentNoteWhereUniqueInput
    data: XOR<WellShipmentNoteUpdateWithoutShipmentInput, WellShipmentNoteUncheckedUpdateWithoutShipmentInput>
  }

  export type WellShipmentNoteUpdateManyWithWhereWithoutShipmentInput = {
    where: WellShipmentNoteScalarWhereInput
    data: XOR<WellShipmentNoteUpdateManyMutationInput, WellShipmentNoteUncheckedUpdateManyWithoutShipmentInput>
  }

  export type WellShipmentNoteScalarWhereInput = {
    AND?: WellShipmentNoteScalarWhereInput | WellShipmentNoteScalarWhereInput[]
    OR?: WellShipmentNoteScalarWhereInput[]
    NOT?: WellShipmentNoteScalarWhereInput | WellShipmentNoteScalarWhereInput[]
    id?: StringFilter<"WellShipmentNote"> | string
    shipmentId?: StringFilter<"WellShipmentNote"> | string
    note?: StringFilter<"WellShipmentNote"> | string
    createdBy?: StringFilter<"WellShipmentNote"> | string
    createdAt?: DateTimeFilter<"WellShipmentNote"> | Date | string
    updatedAt?: DateTimeFilter<"WellShipmentNote"> | Date | string
  }

  export type WellShipmentCreateWithoutEventsInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    refNumber: string
    clientName: string
    clientRef?: string | null
    blNumber: string
    containerSize: string
    vesselName?: string | null
    eta?: Date | string | null
    status?: $Enums.WellShipmentStatus
    health?: string
    healthReason?: string | null
    currentStage?: string | null
    assignedOperator?: string | null
    shippingLine?: string | null
    origin?: string | null
    destination?: string | null
    finalDelivery?: string | null
    transporter?: string | null
    docRecv?: string | null
    lodgeCustoms?: Date | string | null
    entryNumber?: string | null
    entryPassed?: Date | string | null
    tblNtbl?: string | null
    slineCharges?: Date | string | null
    slinePaid?: Date | string | null
    ddRecv?: Date | string | null
    lastSlingCfs?: string | null
    lodgedKpa?: Date | string | null
    dateVerified?: Date | string | null
    isPaid?: boolean
    paidAt?: Date | string | null
    amount?: Decimal | DecimalJsLike | number | string | null
    roeKsh?: Decimal | DecimalJsLike | number | string | null
    invoiceDate?: Date | string | null
    notes?: string | null
    documents?: WellDocumentCreateNestedManyWithoutShipmentInput
    containers?: WellContainerCreateNestedManyWithoutShipmentInput
    exceptions?: WellExceptionCreateNestedManyWithoutShipmentInput
    notesHistory?: WellShipmentNoteCreateNestedManyWithoutShipmentInput
  }

  export type WellShipmentUncheckedCreateWithoutEventsInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    refNumber: string
    clientName: string
    clientRef?: string | null
    blNumber: string
    containerSize: string
    vesselName?: string | null
    eta?: Date | string | null
    status?: $Enums.WellShipmentStatus
    health?: string
    healthReason?: string | null
    currentStage?: string | null
    assignedOperator?: string | null
    shippingLine?: string | null
    origin?: string | null
    destination?: string | null
    finalDelivery?: string | null
    transporter?: string | null
    docRecv?: string | null
    lodgeCustoms?: Date | string | null
    entryNumber?: string | null
    entryPassed?: Date | string | null
    tblNtbl?: string | null
    slineCharges?: Date | string | null
    slinePaid?: Date | string | null
    ddRecv?: Date | string | null
    lastSlingCfs?: string | null
    lodgedKpa?: Date | string | null
    dateVerified?: Date | string | null
    isPaid?: boolean
    paidAt?: Date | string | null
    amount?: Decimal | DecimalJsLike | number | string | null
    roeKsh?: Decimal | DecimalJsLike | number | string | null
    invoiceDate?: Date | string | null
    notes?: string | null
    documents?: WellDocumentUncheckedCreateNestedManyWithoutShipmentInput
    containers?: WellContainerUncheckedCreateNestedManyWithoutShipmentInput
    exceptions?: WellExceptionUncheckedCreateNestedManyWithoutShipmentInput
    notesHistory?: WellShipmentNoteUncheckedCreateNestedManyWithoutShipmentInput
  }

  export type WellShipmentCreateOrConnectWithoutEventsInput = {
    where: WellShipmentWhereUniqueInput
    create: XOR<WellShipmentCreateWithoutEventsInput, WellShipmentUncheckedCreateWithoutEventsInput>
  }

  export type WellShipmentUpsertWithoutEventsInput = {
    update: XOR<WellShipmentUpdateWithoutEventsInput, WellShipmentUncheckedUpdateWithoutEventsInput>
    create: XOR<WellShipmentCreateWithoutEventsInput, WellShipmentUncheckedCreateWithoutEventsInput>
    where?: WellShipmentWhereInput
  }

  export type WellShipmentUpdateToOneWithWhereWithoutEventsInput = {
    where?: WellShipmentWhereInput
    data: XOR<WellShipmentUpdateWithoutEventsInput, WellShipmentUncheckedUpdateWithoutEventsInput>
  }

  export type WellShipmentUpdateWithoutEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    refNumber?: StringFieldUpdateOperationsInput | string
    clientName?: StringFieldUpdateOperationsInput | string
    clientRef?: NullableStringFieldUpdateOperationsInput | string | null
    blNumber?: StringFieldUpdateOperationsInput | string
    containerSize?: StringFieldUpdateOperationsInput | string
    vesselName?: NullableStringFieldUpdateOperationsInput | string | null
    eta?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumWellShipmentStatusFieldUpdateOperationsInput | $Enums.WellShipmentStatus
    health?: StringFieldUpdateOperationsInput | string
    healthReason?: NullableStringFieldUpdateOperationsInput | string | null
    currentStage?: NullableStringFieldUpdateOperationsInput | string | null
    assignedOperator?: NullableStringFieldUpdateOperationsInput | string | null
    shippingLine?: NullableStringFieldUpdateOperationsInput | string | null
    origin?: NullableStringFieldUpdateOperationsInput | string | null
    destination?: NullableStringFieldUpdateOperationsInput | string | null
    finalDelivery?: NullableStringFieldUpdateOperationsInput | string | null
    transporter?: NullableStringFieldUpdateOperationsInput | string | null
    docRecv?: NullableStringFieldUpdateOperationsInput | string | null
    lodgeCustoms?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    entryNumber?: NullableStringFieldUpdateOperationsInput | string | null
    entryPassed?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    tblNtbl?: NullableStringFieldUpdateOperationsInput | string | null
    slineCharges?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    slinePaid?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ddRecv?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastSlingCfs?: NullableStringFieldUpdateOperationsInput | string | null
    lodgedKpa?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dateVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isPaid?: BoolFieldUpdateOperationsInput | boolean
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    amount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    roeKsh?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    invoiceDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    documents?: WellDocumentUpdateManyWithoutShipmentNestedInput
    containers?: WellContainerUpdateManyWithoutShipmentNestedInput
    exceptions?: WellExceptionUpdateManyWithoutShipmentNestedInput
    notesHistory?: WellShipmentNoteUpdateManyWithoutShipmentNestedInput
  }

  export type WellShipmentUncheckedUpdateWithoutEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    refNumber?: StringFieldUpdateOperationsInput | string
    clientName?: StringFieldUpdateOperationsInput | string
    clientRef?: NullableStringFieldUpdateOperationsInput | string | null
    blNumber?: StringFieldUpdateOperationsInput | string
    containerSize?: StringFieldUpdateOperationsInput | string
    vesselName?: NullableStringFieldUpdateOperationsInput | string | null
    eta?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumWellShipmentStatusFieldUpdateOperationsInput | $Enums.WellShipmentStatus
    health?: StringFieldUpdateOperationsInput | string
    healthReason?: NullableStringFieldUpdateOperationsInput | string | null
    currentStage?: NullableStringFieldUpdateOperationsInput | string | null
    assignedOperator?: NullableStringFieldUpdateOperationsInput | string | null
    shippingLine?: NullableStringFieldUpdateOperationsInput | string | null
    origin?: NullableStringFieldUpdateOperationsInput | string | null
    destination?: NullableStringFieldUpdateOperationsInput | string | null
    finalDelivery?: NullableStringFieldUpdateOperationsInput | string | null
    transporter?: NullableStringFieldUpdateOperationsInput | string | null
    docRecv?: NullableStringFieldUpdateOperationsInput | string | null
    lodgeCustoms?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    entryNumber?: NullableStringFieldUpdateOperationsInput | string | null
    entryPassed?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    tblNtbl?: NullableStringFieldUpdateOperationsInput | string | null
    slineCharges?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    slinePaid?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ddRecv?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastSlingCfs?: NullableStringFieldUpdateOperationsInput | string | null
    lodgedKpa?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dateVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isPaid?: BoolFieldUpdateOperationsInput | boolean
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    amount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    roeKsh?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    invoiceDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    documents?: WellDocumentUncheckedUpdateManyWithoutShipmentNestedInput
    containers?: WellContainerUncheckedUpdateManyWithoutShipmentNestedInput
    exceptions?: WellExceptionUncheckedUpdateManyWithoutShipmentNestedInput
    notesHistory?: WellShipmentNoteUncheckedUpdateManyWithoutShipmentNestedInput
  }

  export type WellShipmentCreateWithoutExceptionsInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    refNumber: string
    clientName: string
    clientRef?: string | null
    blNumber: string
    containerSize: string
    vesselName?: string | null
    eta?: Date | string | null
    status?: $Enums.WellShipmentStatus
    health?: string
    healthReason?: string | null
    currentStage?: string | null
    assignedOperator?: string | null
    shippingLine?: string | null
    origin?: string | null
    destination?: string | null
    finalDelivery?: string | null
    transporter?: string | null
    docRecv?: string | null
    lodgeCustoms?: Date | string | null
    entryNumber?: string | null
    entryPassed?: Date | string | null
    tblNtbl?: string | null
    slineCharges?: Date | string | null
    slinePaid?: Date | string | null
    ddRecv?: Date | string | null
    lastSlingCfs?: string | null
    lodgedKpa?: Date | string | null
    dateVerified?: Date | string | null
    isPaid?: boolean
    paidAt?: Date | string | null
    amount?: Decimal | DecimalJsLike | number | string | null
    roeKsh?: Decimal | DecimalJsLike | number | string | null
    invoiceDate?: Date | string | null
    notes?: string | null
    documents?: WellDocumentCreateNestedManyWithoutShipmentInput
    containers?: WellContainerCreateNestedManyWithoutShipmentInput
    events?: WellEventCreateNestedManyWithoutShipmentInput
    notesHistory?: WellShipmentNoteCreateNestedManyWithoutShipmentInput
  }

  export type WellShipmentUncheckedCreateWithoutExceptionsInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    refNumber: string
    clientName: string
    clientRef?: string | null
    blNumber: string
    containerSize: string
    vesselName?: string | null
    eta?: Date | string | null
    status?: $Enums.WellShipmentStatus
    health?: string
    healthReason?: string | null
    currentStage?: string | null
    assignedOperator?: string | null
    shippingLine?: string | null
    origin?: string | null
    destination?: string | null
    finalDelivery?: string | null
    transporter?: string | null
    docRecv?: string | null
    lodgeCustoms?: Date | string | null
    entryNumber?: string | null
    entryPassed?: Date | string | null
    tblNtbl?: string | null
    slineCharges?: Date | string | null
    slinePaid?: Date | string | null
    ddRecv?: Date | string | null
    lastSlingCfs?: string | null
    lodgedKpa?: Date | string | null
    dateVerified?: Date | string | null
    isPaid?: boolean
    paidAt?: Date | string | null
    amount?: Decimal | DecimalJsLike | number | string | null
    roeKsh?: Decimal | DecimalJsLike | number | string | null
    invoiceDate?: Date | string | null
    notes?: string | null
    documents?: WellDocumentUncheckedCreateNestedManyWithoutShipmentInput
    containers?: WellContainerUncheckedCreateNestedManyWithoutShipmentInput
    events?: WellEventUncheckedCreateNestedManyWithoutShipmentInput
    notesHistory?: WellShipmentNoteUncheckedCreateNestedManyWithoutShipmentInput
  }

  export type WellShipmentCreateOrConnectWithoutExceptionsInput = {
    where: WellShipmentWhereUniqueInput
    create: XOR<WellShipmentCreateWithoutExceptionsInput, WellShipmentUncheckedCreateWithoutExceptionsInput>
  }

  export type WellShipmentUpsertWithoutExceptionsInput = {
    update: XOR<WellShipmentUpdateWithoutExceptionsInput, WellShipmentUncheckedUpdateWithoutExceptionsInput>
    create: XOR<WellShipmentCreateWithoutExceptionsInput, WellShipmentUncheckedCreateWithoutExceptionsInput>
    where?: WellShipmentWhereInput
  }

  export type WellShipmentUpdateToOneWithWhereWithoutExceptionsInput = {
    where?: WellShipmentWhereInput
    data: XOR<WellShipmentUpdateWithoutExceptionsInput, WellShipmentUncheckedUpdateWithoutExceptionsInput>
  }

  export type WellShipmentUpdateWithoutExceptionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    refNumber?: StringFieldUpdateOperationsInput | string
    clientName?: StringFieldUpdateOperationsInput | string
    clientRef?: NullableStringFieldUpdateOperationsInput | string | null
    blNumber?: StringFieldUpdateOperationsInput | string
    containerSize?: StringFieldUpdateOperationsInput | string
    vesselName?: NullableStringFieldUpdateOperationsInput | string | null
    eta?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumWellShipmentStatusFieldUpdateOperationsInput | $Enums.WellShipmentStatus
    health?: StringFieldUpdateOperationsInput | string
    healthReason?: NullableStringFieldUpdateOperationsInput | string | null
    currentStage?: NullableStringFieldUpdateOperationsInput | string | null
    assignedOperator?: NullableStringFieldUpdateOperationsInput | string | null
    shippingLine?: NullableStringFieldUpdateOperationsInput | string | null
    origin?: NullableStringFieldUpdateOperationsInput | string | null
    destination?: NullableStringFieldUpdateOperationsInput | string | null
    finalDelivery?: NullableStringFieldUpdateOperationsInput | string | null
    transporter?: NullableStringFieldUpdateOperationsInput | string | null
    docRecv?: NullableStringFieldUpdateOperationsInput | string | null
    lodgeCustoms?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    entryNumber?: NullableStringFieldUpdateOperationsInput | string | null
    entryPassed?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    tblNtbl?: NullableStringFieldUpdateOperationsInput | string | null
    slineCharges?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    slinePaid?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ddRecv?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastSlingCfs?: NullableStringFieldUpdateOperationsInput | string | null
    lodgedKpa?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dateVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isPaid?: BoolFieldUpdateOperationsInput | boolean
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    amount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    roeKsh?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    invoiceDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    documents?: WellDocumentUpdateManyWithoutShipmentNestedInput
    containers?: WellContainerUpdateManyWithoutShipmentNestedInput
    events?: WellEventUpdateManyWithoutShipmentNestedInput
    notesHistory?: WellShipmentNoteUpdateManyWithoutShipmentNestedInput
  }

  export type WellShipmentUncheckedUpdateWithoutExceptionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    refNumber?: StringFieldUpdateOperationsInput | string
    clientName?: StringFieldUpdateOperationsInput | string
    clientRef?: NullableStringFieldUpdateOperationsInput | string | null
    blNumber?: StringFieldUpdateOperationsInput | string
    containerSize?: StringFieldUpdateOperationsInput | string
    vesselName?: NullableStringFieldUpdateOperationsInput | string | null
    eta?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumWellShipmentStatusFieldUpdateOperationsInput | $Enums.WellShipmentStatus
    health?: StringFieldUpdateOperationsInput | string
    healthReason?: NullableStringFieldUpdateOperationsInput | string | null
    currentStage?: NullableStringFieldUpdateOperationsInput | string | null
    assignedOperator?: NullableStringFieldUpdateOperationsInput | string | null
    shippingLine?: NullableStringFieldUpdateOperationsInput | string | null
    origin?: NullableStringFieldUpdateOperationsInput | string | null
    destination?: NullableStringFieldUpdateOperationsInput | string | null
    finalDelivery?: NullableStringFieldUpdateOperationsInput | string | null
    transporter?: NullableStringFieldUpdateOperationsInput | string | null
    docRecv?: NullableStringFieldUpdateOperationsInput | string | null
    lodgeCustoms?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    entryNumber?: NullableStringFieldUpdateOperationsInput | string | null
    entryPassed?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    tblNtbl?: NullableStringFieldUpdateOperationsInput | string | null
    slineCharges?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    slinePaid?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ddRecv?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastSlingCfs?: NullableStringFieldUpdateOperationsInput | string | null
    lodgedKpa?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dateVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isPaid?: BoolFieldUpdateOperationsInput | boolean
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    amount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    roeKsh?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    invoiceDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    documents?: WellDocumentUncheckedUpdateManyWithoutShipmentNestedInput
    containers?: WellContainerUncheckedUpdateManyWithoutShipmentNestedInput
    events?: WellEventUncheckedUpdateManyWithoutShipmentNestedInput
    notesHistory?: WellShipmentNoteUncheckedUpdateManyWithoutShipmentNestedInput
  }

  export type WellShipmentCreateWithoutContainersInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    refNumber: string
    clientName: string
    clientRef?: string | null
    blNumber: string
    containerSize: string
    vesselName?: string | null
    eta?: Date | string | null
    status?: $Enums.WellShipmentStatus
    health?: string
    healthReason?: string | null
    currentStage?: string | null
    assignedOperator?: string | null
    shippingLine?: string | null
    origin?: string | null
    destination?: string | null
    finalDelivery?: string | null
    transporter?: string | null
    docRecv?: string | null
    lodgeCustoms?: Date | string | null
    entryNumber?: string | null
    entryPassed?: Date | string | null
    tblNtbl?: string | null
    slineCharges?: Date | string | null
    slinePaid?: Date | string | null
    ddRecv?: Date | string | null
    lastSlingCfs?: string | null
    lodgedKpa?: Date | string | null
    dateVerified?: Date | string | null
    isPaid?: boolean
    paidAt?: Date | string | null
    amount?: Decimal | DecimalJsLike | number | string | null
    roeKsh?: Decimal | DecimalJsLike | number | string | null
    invoiceDate?: Date | string | null
    notes?: string | null
    documents?: WellDocumentCreateNestedManyWithoutShipmentInput
    events?: WellEventCreateNestedManyWithoutShipmentInput
    exceptions?: WellExceptionCreateNestedManyWithoutShipmentInput
    notesHistory?: WellShipmentNoteCreateNestedManyWithoutShipmentInput
  }

  export type WellShipmentUncheckedCreateWithoutContainersInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    refNumber: string
    clientName: string
    clientRef?: string | null
    blNumber: string
    containerSize: string
    vesselName?: string | null
    eta?: Date | string | null
    status?: $Enums.WellShipmentStatus
    health?: string
    healthReason?: string | null
    currentStage?: string | null
    assignedOperator?: string | null
    shippingLine?: string | null
    origin?: string | null
    destination?: string | null
    finalDelivery?: string | null
    transporter?: string | null
    docRecv?: string | null
    lodgeCustoms?: Date | string | null
    entryNumber?: string | null
    entryPassed?: Date | string | null
    tblNtbl?: string | null
    slineCharges?: Date | string | null
    slinePaid?: Date | string | null
    ddRecv?: Date | string | null
    lastSlingCfs?: string | null
    lodgedKpa?: Date | string | null
    dateVerified?: Date | string | null
    isPaid?: boolean
    paidAt?: Date | string | null
    amount?: Decimal | DecimalJsLike | number | string | null
    roeKsh?: Decimal | DecimalJsLike | number | string | null
    invoiceDate?: Date | string | null
    notes?: string | null
    documents?: WellDocumentUncheckedCreateNestedManyWithoutShipmentInput
    events?: WellEventUncheckedCreateNestedManyWithoutShipmentInput
    exceptions?: WellExceptionUncheckedCreateNestedManyWithoutShipmentInput
    notesHistory?: WellShipmentNoteUncheckedCreateNestedManyWithoutShipmentInput
  }

  export type WellShipmentCreateOrConnectWithoutContainersInput = {
    where: WellShipmentWhereUniqueInput
    create: XOR<WellShipmentCreateWithoutContainersInput, WellShipmentUncheckedCreateWithoutContainersInput>
  }

  export type WellShipmentUpsertWithoutContainersInput = {
    update: XOR<WellShipmentUpdateWithoutContainersInput, WellShipmentUncheckedUpdateWithoutContainersInput>
    create: XOR<WellShipmentCreateWithoutContainersInput, WellShipmentUncheckedCreateWithoutContainersInput>
    where?: WellShipmentWhereInput
  }

  export type WellShipmentUpdateToOneWithWhereWithoutContainersInput = {
    where?: WellShipmentWhereInput
    data: XOR<WellShipmentUpdateWithoutContainersInput, WellShipmentUncheckedUpdateWithoutContainersInput>
  }

  export type WellShipmentUpdateWithoutContainersInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    refNumber?: StringFieldUpdateOperationsInput | string
    clientName?: StringFieldUpdateOperationsInput | string
    clientRef?: NullableStringFieldUpdateOperationsInput | string | null
    blNumber?: StringFieldUpdateOperationsInput | string
    containerSize?: StringFieldUpdateOperationsInput | string
    vesselName?: NullableStringFieldUpdateOperationsInput | string | null
    eta?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumWellShipmentStatusFieldUpdateOperationsInput | $Enums.WellShipmentStatus
    health?: StringFieldUpdateOperationsInput | string
    healthReason?: NullableStringFieldUpdateOperationsInput | string | null
    currentStage?: NullableStringFieldUpdateOperationsInput | string | null
    assignedOperator?: NullableStringFieldUpdateOperationsInput | string | null
    shippingLine?: NullableStringFieldUpdateOperationsInput | string | null
    origin?: NullableStringFieldUpdateOperationsInput | string | null
    destination?: NullableStringFieldUpdateOperationsInput | string | null
    finalDelivery?: NullableStringFieldUpdateOperationsInput | string | null
    transporter?: NullableStringFieldUpdateOperationsInput | string | null
    docRecv?: NullableStringFieldUpdateOperationsInput | string | null
    lodgeCustoms?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    entryNumber?: NullableStringFieldUpdateOperationsInput | string | null
    entryPassed?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    tblNtbl?: NullableStringFieldUpdateOperationsInput | string | null
    slineCharges?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    slinePaid?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ddRecv?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastSlingCfs?: NullableStringFieldUpdateOperationsInput | string | null
    lodgedKpa?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dateVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isPaid?: BoolFieldUpdateOperationsInput | boolean
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    amount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    roeKsh?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    invoiceDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    documents?: WellDocumentUpdateManyWithoutShipmentNestedInput
    events?: WellEventUpdateManyWithoutShipmentNestedInput
    exceptions?: WellExceptionUpdateManyWithoutShipmentNestedInput
    notesHistory?: WellShipmentNoteUpdateManyWithoutShipmentNestedInput
  }

  export type WellShipmentUncheckedUpdateWithoutContainersInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    refNumber?: StringFieldUpdateOperationsInput | string
    clientName?: StringFieldUpdateOperationsInput | string
    clientRef?: NullableStringFieldUpdateOperationsInput | string | null
    blNumber?: StringFieldUpdateOperationsInput | string
    containerSize?: StringFieldUpdateOperationsInput | string
    vesselName?: NullableStringFieldUpdateOperationsInput | string | null
    eta?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumWellShipmentStatusFieldUpdateOperationsInput | $Enums.WellShipmentStatus
    health?: StringFieldUpdateOperationsInput | string
    healthReason?: NullableStringFieldUpdateOperationsInput | string | null
    currentStage?: NullableStringFieldUpdateOperationsInput | string | null
    assignedOperator?: NullableStringFieldUpdateOperationsInput | string | null
    shippingLine?: NullableStringFieldUpdateOperationsInput | string | null
    origin?: NullableStringFieldUpdateOperationsInput | string | null
    destination?: NullableStringFieldUpdateOperationsInput | string | null
    finalDelivery?: NullableStringFieldUpdateOperationsInput | string | null
    transporter?: NullableStringFieldUpdateOperationsInput | string | null
    docRecv?: NullableStringFieldUpdateOperationsInput | string | null
    lodgeCustoms?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    entryNumber?: NullableStringFieldUpdateOperationsInput | string | null
    entryPassed?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    tblNtbl?: NullableStringFieldUpdateOperationsInput | string | null
    slineCharges?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    slinePaid?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ddRecv?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastSlingCfs?: NullableStringFieldUpdateOperationsInput | string | null
    lodgedKpa?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dateVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isPaid?: BoolFieldUpdateOperationsInput | boolean
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    amount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    roeKsh?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    invoiceDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    documents?: WellDocumentUncheckedUpdateManyWithoutShipmentNestedInput
    events?: WellEventUncheckedUpdateManyWithoutShipmentNestedInput
    exceptions?: WellExceptionUncheckedUpdateManyWithoutShipmentNestedInput
    notesHistory?: WellShipmentNoteUncheckedUpdateManyWithoutShipmentNestedInput
  }

  export type WellShipmentCreateWithoutDocumentsInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    refNumber: string
    clientName: string
    clientRef?: string | null
    blNumber: string
    containerSize: string
    vesselName?: string | null
    eta?: Date | string | null
    status?: $Enums.WellShipmentStatus
    health?: string
    healthReason?: string | null
    currentStage?: string | null
    assignedOperator?: string | null
    shippingLine?: string | null
    origin?: string | null
    destination?: string | null
    finalDelivery?: string | null
    transporter?: string | null
    docRecv?: string | null
    lodgeCustoms?: Date | string | null
    entryNumber?: string | null
    entryPassed?: Date | string | null
    tblNtbl?: string | null
    slineCharges?: Date | string | null
    slinePaid?: Date | string | null
    ddRecv?: Date | string | null
    lastSlingCfs?: string | null
    lodgedKpa?: Date | string | null
    dateVerified?: Date | string | null
    isPaid?: boolean
    paidAt?: Date | string | null
    amount?: Decimal | DecimalJsLike | number | string | null
    roeKsh?: Decimal | DecimalJsLike | number | string | null
    invoiceDate?: Date | string | null
    notes?: string | null
    containers?: WellContainerCreateNestedManyWithoutShipmentInput
    events?: WellEventCreateNestedManyWithoutShipmentInput
    exceptions?: WellExceptionCreateNestedManyWithoutShipmentInput
    notesHistory?: WellShipmentNoteCreateNestedManyWithoutShipmentInput
  }

  export type WellShipmentUncheckedCreateWithoutDocumentsInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    refNumber: string
    clientName: string
    clientRef?: string | null
    blNumber: string
    containerSize: string
    vesselName?: string | null
    eta?: Date | string | null
    status?: $Enums.WellShipmentStatus
    health?: string
    healthReason?: string | null
    currentStage?: string | null
    assignedOperator?: string | null
    shippingLine?: string | null
    origin?: string | null
    destination?: string | null
    finalDelivery?: string | null
    transporter?: string | null
    docRecv?: string | null
    lodgeCustoms?: Date | string | null
    entryNumber?: string | null
    entryPassed?: Date | string | null
    tblNtbl?: string | null
    slineCharges?: Date | string | null
    slinePaid?: Date | string | null
    ddRecv?: Date | string | null
    lastSlingCfs?: string | null
    lodgedKpa?: Date | string | null
    dateVerified?: Date | string | null
    isPaid?: boolean
    paidAt?: Date | string | null
    amount?: Decimal | DecimalJsLike | number | string | null
    roeKsh?: Decimal | DecimalJsLike | number | string | null
    invoiceDate?: Date | string | null
    notes?: string | null
    containers?: WellContainerUncheckedCreateNestedManyWithoutShipmentInput
    events?: WellEventUncheckedCreateNestedManyWithoutShipmentInput
    exceptions?: WellExceptionUncheckedCreateNestedManyWithoutShipmentInput
    notesHistory?: WellShipmentNoteUncheckedCreateNestedManyWithoutShipmentInput
  }

  export type WellShipmentCreateOrConnectWithoutDocumentsInput = {
    where: WellShipmentWhereUniqueInput
    create: XOR<WellShipmentCreateWithoutDocumentsInput, WellShipmentUncheckedCreateWithoutDocumentsInput>
  }

  export type WellShipmentUpsertWithoutDocumentsInput = {
    update: XOR<WellShipmentUpdateWithoutDocumentsInput, WellShipmentUncheckedUpdateWithoutDocumentsInput>
    create: XOR<WellShipmentCreateWithoutDocumentsInput, WellShipmentUncheckedCreateWithoutDocumentsInput>
    where?: WellShipmentWhereInput
  }

  export type WellShipmentUpdateToOneWithWhereWithoutDocumentsInput = {
    where?: WellShipmentWhereInput
    data: XOR<WellShipmentUpdateWithoutDocumentsInput, WellShipmentUncheckedUpdateWithoutDocumentsInput>
  }

  export type WellShipmentUpdateWithoutDocumentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    refNumber?: StringFieldUpdateOperationsInput | string
    clientName?: StringFieldUpdateOperationsInput | string
    clientRef?: NullableStringFieldUpdateOperationsInput | string | null
    blNumber?: StringFieldUpdateOperationsInput | string
    containerSize?: StringFieldUpdateOperationsInput | string
    vesselName?: NullableStringFieldUpdateOperationsInput | string | null
    eta?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumWellShipmentStatusFieldUpdateOperationsInput | $Enums.WellShipmentStatus
    health?: StringFieldUpdateOperationsInput | string
    healthReason?: NullableStringFieldUpdateOperationsInput | string | null
    currentStage?: NullableStringFieldUpdateOperationsInput | string | null
    assignedOperator?: NullableStringFieldUpdateOperationsInput | string | null
    shippingLine?: NullableStringFieldUpdateOperationsInput | string | null
    origin?: NullableStringFieldUpdateOperationsInput | string | null
    destination?: NullableStringFieldUpdateOperationsInput | string | null
    finalDelivery?: NullableStringFieldUpdateOperationsInput | string | null
    transporter?: NullableStringFieldUpdateOperationsInput | string | null
    docRecv?: NullableStringFieldUpdateOperationsInput | string | null
    lodgeCustoms?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    entryNumber?: NullableStringFieldUpdateOperationsInput | string | null
    entryPassed?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    tblNtbl?: NullableStringFieldUpdateOperationsInput | string | null
    slineCharges?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    slinePaid?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ddRecv?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastSlingCfs?: NullableStringFieldUpdateOperationsInput | string | null
    lodgedKpa?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dateVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isPaid?: BoolFieldUpdateOperationsInput | boolean
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    amount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    roeKsh?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    invoiceDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    containers?: WellContainerUpdateManyWithoutShipmentNestedInput
    events?: WellEventUpdateManyWithoutShipmentNestedInput
    exceptions?: WellExceptionUpdateManyWithoutShipmentNestedInput
    notesHistory?: WellShipmentNoteUpdateManyWithoutShipmentNestedInput
  }

  export type WellShipmentUncheckedUpdateWithoutDocumentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    refNumber?: StringFieldUpdateOperationsInput | string
    clientName?: StringFieldUpdateOperationsInput | string
    clientRef?: NullableStringFieldUpdateOperationsInput | string | null
    blNumber?: StringFieldUpdateOperationsInput | string
    containerSize?: StringFieldUpdateOperationsInput | string
    vesselName?: NullableStringFieldUpdateOperationsInput | string | null
    eta?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumWellShipmentStatusFieldUpdateOperationsInput | $Enums.WellShipmentStatus
    health?: StringFieldUpdateOperationsInput | string
    healthReason?: NullableStringFieldUpdateOperationsInput | string | null
    currentStage?: NullableStringFieldUpdateOperationsInput | string | null
    assignedOperator?: NullableStringFieldUpdateOperationsInput | string | null
    shippingLine?: NullableStringFieldUpdateOperationsInput | string | null
    origin?: NullableStringFieldUpdateOperationsInput | string | null
    destination?: NullableStringFieldUpdateOperationsInput | string | null
    finalDelivery?: NullableStringFieldUpdateOperationsInput | string | null
    transporter?: NullableStringFieldUpdateOperationsInput | string | null
    docRecv?: NullableStringFieldUpdateOperationsInput | string | null
    lodgeCustoms?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    entryNumber?: NullableStringFieldUpdateOperationsInput | string | null
    entryPassed?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    tblNtbl?: NullableStringFieldUpdateOperationsInput | string | null
    slineCharges?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    slinePaid?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ddRecv?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastSlingCfs?: NullableStringFieldUpdateOperationsInput | string | null
    lodgedKpa?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dateVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isPaid?: BoolFieldUpdateOperationsInput | boolean
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    amount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    roeKsh?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    invoiceDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    containers?: WellContainerUncheckedUpdateManyWithoutShipmentNestedInput
    events?: WellEventUncheckedUpdateManyWithoutShipmentNestedInput
    exceptions?: WellExceptionUncheckedUpdateManyWithoutShipmentNestedInput
    notesHistory?: WellShipmentNoteUncheckedUpdateManyWithoutShipmentNestedInput
  }

  export type WellShipmentCreateWithoutNotesHistoryInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    refNumber: string
    clientName: string
    clientRef?: string | null
    blNumber: string
    containerSize: string
    vesselName?: string | null
    eta?: Date | string | null
    status?: $Enums.WellShipmentStatus
    health?: string
    healthReason?: string | null
    currentStage?: string | null
    assignedOperator?: string | null
    shippingLine?: string | null
    origin?: string | null
    destination?: string | null
    finalDelivery?: string | null
    transporter?: string | null
    docRecv?: string | null
    lodgeCustoms?: Date | string | null
    entryNumber?: string | null
    entryPassed?: Date | string | null
    tblNtbl?: string | null
    slineCharges?: Date | string | null
    slinePaid?: Date | string | null
    ddRecv?: Date | string | null
    lastSlingCfs?: string | null
    lodgedKpa?: Date | string | null
    dateVerified?: Date | string | null
    isPaid?: boolean
    paidAt?: Date | string | null
    amount?: Decimal | DecimalJsLike | number | string | null
    roeKsh?: Decimal | DecimalJsLike | number | string | null
    invoiceDate?: Date | string | null
    notes?: string | null
    documents?: WellDocumentCreateNestedManyWithoutShipmentInput
    containers?: WellContainerCreateNestedManyWithoutShipmentInput
    events?: WellEventCreateNestedManyWithoutShipmentInput
    exceptions?: WellExceptionCreateNestedManyWithoutShipmentInput
  }

  export type WellShipmentUncheckedCreateWithoutNotesHistoryInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    refNumber: string
    clientName: string
    clientRef?: string | null
    blNumber: string
    containerSize: string
    vesselName?: string | null
    eta?: Date | string | null
    status?: $Enums.WellShipmentStatus
    health?: string
    healthReason?: string | null
    currentStage?: string | null
    assignedOperator?: string | null
    shippingLine?: string | null
    origin?: string | null
    destination?: string | null
    finalDelivery?: string | null
    transporter?: string | null
    docRecv?: string | null
    lodgeCustoms?: Date | string | null
    entryNumber?: string | null
    entryPassed?: Date | string | null
    tblNtbl?: string | null
    slineCharges?: Date | string | null
    slinePaid?: Date | string | null
    ddRecv?: Date | string | null
    lastSlingCfs?: string | null
    lodgedKpa?: Date | string | null
    dateVerified?: Date | string | null
    isPaid?: boolean
    paidAt?: Date | string | null
    amount?: Decimal | DecimalJsLike | number | string | null
    roeKsh?: Decimal | DecimalJsLike | number | string | null
    invoiceDate?: Date | string | null
    notes?: string | null
    documents?: WellDocumentUncheckedCreateNestedManyWithoutShipmentInput
    containers?: WellContainerUncheckedCreateNestedManyWithoutShipmentInput
    events?: WellEventUncheckedCreateNestedManyWithoutShipmentInput
    exceptions?: WellExceptionUncheckedCreateNestedManyWithoutShipmentInput
  }

  export type WellShipmentCreateOrConnectWithoutNotesHistoryInput = {
    where: WellShipmentWhereUniqueInput
    create: XOR<WellShipmentCreateWithoutNotesHistoryInput, WellShipmentUncheckedCreateWithoutNotesHistoryInput>
  }

  export type WellShipmentUpsertWithoutNotesHistoryInput = {
    update: XOR<WellShipmentUpdateWithoutNotesHistoryInput, WellShipmentUncheckedUpdateWithoutNotesHistoryInput>
    create: XOR<WellShipmentCreateWithoutNotesHistoryInput, WellShipmentUncheckedCreateWithoutNotesHistoryInput>
    where?: WellShipmentWhereInput
  }

  export type WellShipmentUpdateToOneWithWhereWithoutNotesHistoryInput = {
    where?: WellShipmentWhereInput
    data: XOR<WellShipmentUpdateWithoutNotesHistoryInput, WellShipmentUncheckedUpdateWithoutNotesHistoryInput>
  }

  export type WellShipmentUpdateWithoutNotesHistoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    refNumber?: StringFieldUpdateOperationsInput | string
    clientName?: StringFieldUpdateOperationsInput | string
    clientRef?: NullableStringFieldUpdateOperationsInput | string | null
    blNumber?: StringFieldUpdateOperationsInput | string
    containerSize?: StringFieldUpdateOperationsInput | string
    vesselName?: NullableStringFieldUpdateOperationsInput | string | null
    eta?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumWellShipmentStatusFieldUpdateOperationsInput | $Enums.WellShipmentStatus
    health?: StringFieldUpdateOperationsInput | string
    healthReason?: NullableStringFieldUpdateOperationsInput | string | null
    currentStage?: NullableStringFieldUpdateOperationsInput | string | null
    assignedOperator?: NullableStringFieldUpdateOperationsInput | string | null
    shippingLine?: NullableStringFieldUpdateOperationsInput | string | null
    origin?: NullableStringFieldUpdateOperationsInput | string | null
    destination?: NullableStringFieldUpdateOperationsInput | string | null
    finalDelivery?: NullableStringFieldUpdateOperationsInput | string | null
    transporter?: NullableStringFieldUpdateOperationsInput | string | null
    docRecv?: NullableStringFieldUpdateOperationsInput | string | null
    lodgeCustoms?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    entryNumber?: NullableStringFieldUpdateOperationsInput | string | null
    entryPassed?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    tblNtbl?: NullableStringFieldUpdateOperationsInput | string | null
    slineCharges?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    slinePaid?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ddRecv?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastSlingCfs?: NullableStringFieldUpdateOperationsInput | string | null
    lodgedKpa?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dateVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isPaid?: BoolFieldUpdateOperationsInput | boolean
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    amount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    roeKsh?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    invoiceDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    documents?: WellDocumentUpdateManyWithoutShipmentNestedInput
    containers?: WellContainerUpdateManyWithoutShipmentNestedInput
    events?: WellEventUpdateManyWithoutShipmentNestedInput
    exceptions?: WellExceptionUpdateManyWithoutShipmentNestedInput
  }

  export type WellShipmentUncheckedUpdateWithoutNotesHistoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    refNumber?: StringFieldUpdateOperationsInput | string
    clientName?: StringFieldUpdateOperationsInput | string
    clientRef?: NullableStringFieldUpdateOperationsInput | string | null
    blNumber?: StringFieldUpdateOperationsInput | string
    containerSize?: StringFieldUpdateOperationsInput | string
    vesselName?: NullableStringFieldUpdateOperationsInput | string | null
    eta?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumWellShipmentStatusFieldUpdateOperationsInput | $Enums.WellShipmentStatus
    health?: StringFieldUpdateOperationsInput | string
    healthReason?: NullableStringFieldUpdateOperationsInput | string | null
    currentStage?: NullableStringFieldUpdateOperationsInput | string | null
    assignedOperator?: NullableStringFieldUpdateOperationsInput | string | null
    shippingLine?: NullableStringFieldUpdateOperationsInput | string | null
    origin?: NullableStringFieldUpdateOperationsInput | string | null
    destination?: NullableStringFieldUpdateOperationsInput | string | null
    finalDelivery?: NullableStringFieldUpdateOperationsInput | string | null
    transporter?: NullableStringFieldUpdateOperationsInput | string | null
    docRecv?: NullableStringFieldUpdateOperationsInput | string | null
    lodgeCustoms?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    entryNumber?: NullableStringFieldUpdateOperationsInput | string | null
    entryPassed?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    tblNtbl?: NullableStringFieldUpdateOperationsInput | string | null
    slineCharges?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    slinePaid?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ddRecv?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastSlingCfs?: NullableStringFieldUpdateOperationsInput | string | null
    lodgedKpa?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dateVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isPaid?: BoolFieldUpdateOperationsInput | boolean
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    amount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    roeKsh?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    invoiceDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    documents?: WellDocumentUncheckedUpdateManyWithoutShipmentNestedInput
    containers?: WellContainerUncheckedUpdateManyWithoutShipmentNestedInput
    events?: WellEventUncheckedUpdateManyWithoutShipmentNestedInput
    exceptions?: WellExceptionUncheckedUpdateManyWithoutShipmentNestedInput
  }

  export type DocumentCreateManyShipmentInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    type: $Enums.DocumentType
    filename: string
    driveFileId: string
    driveUrl: string
    version?: number
    isReplaced?: boolean
  }

  export type DocumentUpdateWithoutShipmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumDocumentTypeFieldUpdateOperationsInput | $Enums.DocumentType
    filename?: StringFieldUpdateOperationsInput | string
    driveFileId?: StringFieldUpdateOperationsInput | string
    driveUrl?: StringFieldUpdateOperationsInput | string
    version?: IntFieldUpdateOperationsInput | number
    isReplaced?: BoolFieldUpdateOperationsInput | boolean
  }

  export type DocumentUncheckedUpdateWithoutShipmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumDocumentTypeFieldUpdateOperationsInput | $Enums.DocumentType
    filename?: StringFieldUpdateOperationsInput | string
    driveFileId?: StringFieldUpdateOperationsInput | string
    driveUrl?: StringFieldUpdateOperationsInput | string
    version?: IntFieldUpdateOperationsInput | number
    isReplaced?: BoolFieldUpdateOperationsInput | boolean
  }

  export type DocumentUncheckedUpdateManyWithoutShipmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumDocumentTypeFieldUpdateOperationsInput | $Enums.DocumentType
    filename?: StringFieldUpdateOperationsInput | string
    driveFileId?: StringFieldUpdateOperationsInput | string
    driveUrl?: StringFieldUpdateOperationsInput | string
    version?: IntFieldUpdateOperationsInput | number
    isReplaced?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ResetTokenCreateManyUserInput = {
    id?: string
    token: string
    expires: Date | string
    createdAt?: Date | string
  }

  export type ActivityLogCreateManyUserInput = {
    id?: string
    createdAt?: Date | string
    action: string
    entity: string
    entityId?: string | null
    detail?: string | null
  }

  export type ResetTokenUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResetTokenUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResetTokenUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActivityLogUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    action?: StringFieldUpdateOperationsInput | string
    entity?: StringFieldUpdateOperationsInput | string
    entityId?: NullableStringFieldUpdateOperationsInput | string | null
    detail?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ActivityLogUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    action?: StringFieldUpdateOperationsInput | string
    entity?: StringFieldUpdateOperationsInput | string
    entityId?: NullableStringFieldUpdateOperationsInput | string | null
    detail?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ActivityLogUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    action?: StringFieldUpdateOperationsInput | string
    entity?: StringFieldUpdateOperationsInput | string
    entityId?: NullableStringFieldUpdateOperationsInput | string | null
    detail?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type WellDocumentCreateManyShipmentInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    filename: string
    driveFileId: string
    driveUrl: string
    docType: string
  }

  export type WellContainerCreateManyShipmentInput = {
    id?: string
    containerNumber: string
    size?: string | null
    weight?: number | null
    dischargeDate?: Date | string | null
    gateOutDate?: Date | string | null
    truckDetails?: string | null
    driverName?: string | null
    status?: string | null
    remarks?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WellEventCreateManyShipmentInput = {
    id?: string
    title: string
    description?: string | null
    stage?: string | null
    source?: string
    updatedBy?: string
    reference?: string | null
    createdAt?: Date | string
  }

  export type WellExceptionCreateManyShipmentInput = {
    id?: string
    containerId?: string | null
    issueType: string
    severity?: string
    status?: string
    description: string
    expectedResolution?: string | null
    assignedTo?: string | null
    dueDate?: Date | string | null
    createdBy?: string
    createdAt?: Date | string
    resolvedAt?: Date | string | null
    resolvedBy?: string | null
  }

  export type WellShipmentNoteCreateManyShipmentInput = {
    id?: string
    note: string
    createdBy?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WellDocumentUpdateWithoutShipmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    filename?: StringFieldUpdateOperationsInput | string
    driveFileId?: StringFieldUpdateOperationsInput | string
    driveUrl?: StringFieldUpdateOperationsInput | string
    docType?: StringFieldUpdateOperationsInput | string
  }

  export type WellDocumentUncheckedUpdateWithoutShipmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    filename?: StringFieldUpdateOperationsInput | string
    driveFileId?: StringFieldUpdateOperationsInput | string
    driveUrl?: StringFieldUpdateOperationsInput | string
    docType?: StringFieldUpdateOperationsInput | string
  }

  export type WellDocumentUncheckedUpdateManyWithoutShipmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    filename?: StringFieldUpdateOperationsInput | string
    driveFileId?: StringFieldUpdateOperationsInput | string
    driveUrl?: StringFieldUpdateOperationsInput | string
    docType?: StringFieldUpdateOperationsInput | string
  }

  export type WellContainerUpdateWithoutShipmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    containerNumber?: StringFieldUpdateOperationsInput | string
    size?: NullableStringFieldUpdateOperationsInput | string | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    dischargeDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gateOutDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    truckDetails?: NullableStringFieldUpdateOperationsInput | string | null
    driverName?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WellContainerUncheckedUpdateWithoutShipmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    containerNumber?: StringFieldUpdateOperationsInput | string
    size?: NullableStringFieldUpdateOperationsInput | string | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    dischargeDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gateOutDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    truckDetails?: NullableStringFieldUpdateOperationsInput | string | null
    driverName?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WellContainerUncheckedUpdateManyWithoutShipmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    containerNumber?: StringFieldUpdateOperationsInput | string
    size?: NullableStringFieldUpdateOperationsInput | string | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    dischargeDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gateOutDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    truckDetails?: NullableStringFieldUpdateOperationsInput | string | null
    driverName?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WellEventUpdateWithoutShipmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    stage?: NullableStringFieldUpdateOperationsInput | string | null
    source?: StringFieldUpdateOperationsInput | string
    updatedBy?: StringFieldUpdateOperationsInput | string
    reference?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WellEventUncheckedUpdateWithoutShipmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    stage?: NullableStringFieldUpdateOperationsInput | string | null
    source?: StringFieldUpdateOperationsInput | string
    updatedBy?: StringFieldUpdateOperationsInput | string
    reference?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WellEventUncheckedUpdateManyWithoutShipmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    stage?: NullableStringFieldUpdateOperationsInput | string | null
    source?: StringFieldUpdateOperationsInput | string
    updatedBy?: StringFieldUpdateOperationsInput | string
    reference?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WellExceptionUpdateWithoutShipmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    containerId?: NullableStringFieldUpdateOperationsInput | string | null
    issueType?: StringFieldUpdateOperationsInput | string
    severity?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    expectedResolution?: NullableStringFieldUpdateOperationsInput | string | null
    assignedTo?: NullableStringFieldUpdateOperationsInput | string | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolvedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type WellExceptionUncheckedUpdateWithoutShipmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    containerId?: NullableStringFieldUpdateOperationsInput | string | null
    issueType?: StringFieldUpdateOperationsInput | string
    severity?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    expectedResolution?: NullableStringFieldUpdateOperationsInput | string | null
    assignedTo?: NullableStringFieldUpdateOperationsInput | string | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolvedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type WellExceptionUncheckedUpdateManyWithoutShipmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    containerId?: NullableStringFieldUpdateOperationsInput | string | null
    issueType?: StringFieldUpdateOperationsInput | string
    severity?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    expectedResolution?: NullableStringFieldUpdateOperationsInput | string | null
    assignedTo?: NullableStringFieldUpdateOperationsInput | string | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolvedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type WellShipmentNoteUpdateWithoutShipmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    note?: StringFieldUpdateOperationsInput | string
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WellShipmentNoteUncheckedUpdateWithoutShipmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    note?: StringFieldUpdateOperationsInput | string
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WellShipmentNoteUncheckedUpdateManyWithoutShipmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    note?: StringFieldUpdateOperationsInput | string
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}