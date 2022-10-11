/**
 * Get value of an object property/path even if it's nested
 */
export function getValueByPath(obj, path) {
  return path.split('.').reduce((o, i) => (o ? o[i] : null), obj)
}

export function isCustomElement(vm) {
  return 'shadowRoot' in vm.$root.$options
}

export function removeElement(el) {
  if (typeof el.remove !== 'undefined') {
    el.remove()
  } else if (typeof el.parentNode !== 'undefined' && el.parentNode !== null) {
    el.parentNode.removeChild(el)
  }
}

export function createAbsoluteElement(el) {
  const root = document.createElement('div')
  root.style.position = 'absolute'
  root.style.left = '0px'
  root.style.top = '0px'
  root.style.width = '100%'
  const wrapper = document.createElement('div')
  root.appendChild(wrapper)
  wrapper.appendChild(el)
  document.body.appendChild(root)
  return root
}

/**
 * Merge function to replace Object.assign with deep merging possibility
 */
const isObject = (item) => typeof item === 'object' && !Array.isArray(item)
const mergeFn = (target, source, deep = false) => {
  if (deep || !Object.assign) {
    const isDeep = (prop) =>
      // eslint-disable-next-line no-prototype-builtins
      isObject(source[prop]) && target !== null && target.hasOwnProperty(prop) && isObject(target[prop])
    const replaced = Object.getOwnPropertyNames(source)
      .map((prop) => ({ [prop]: isDeep(prop) ? mergeFn(target[prop], source[prop], deep) : source[prop] }))
      .reduce((a, b) => ({ ...a, ...b }), {})

    return {
      ...target,
      ...replaced,
    }
  } else {
    return Object.assign(target, source)
  }
}
export const merge = mergeFn
