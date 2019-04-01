class MyClass<TypeVar> {
  myProp: TypeVar;
}
type GenericType<TypeVar> = TypeVar & {modified: boolean}
function genericFn<TypeVar>(arg: TypeVar) {}
