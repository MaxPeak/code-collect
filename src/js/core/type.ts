enum Types {
  'Infinity',
  'NaN',

  'Undefined',
  'Null',
  'Boolean',
  'Number',
  'String',
  'Symbol',
  'BigInt',

  'Function',
  'Array',
  'Object',
  'Date',
  'Map',
  'WeakMap',
  'Set',
  'WeakSet',
  'RegExp',
  'Promise',
  'Blob'
}

export const type = (target: any) => {
  const originType = Object.prototype.toString.call(target).replace(/\[object (.*)\]/, ($1, $2) => $2)
  return {
    is: (type: keyof typeof Types) => {
      switch (true) {
        case type === 'NaN':
          return Number.isNaN(target)
        case type === 'Infinity':
          return !Number.isFinite(target)
        default:
          return type === originType
      }
    }
  }
}