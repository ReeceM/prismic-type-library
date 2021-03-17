import { Button } from '../ui/button';

/**
 * Modal footer component
 */

function Action({ label, action, primary }) {
  return (
    <span
      className={"flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto" + (index >= 1 ? 'sm:mt-0 mt-3' : '')}>
      <Button action={action} primary={primary}>{label}</Button>
    </span>
  )
}

/**
 * Modal Footer
 *
 * @param {Object} param0
 * @param {Object} param0.children
 * @param {Array} param0.actions
 * @param {Object} param0.theme
 */
export default function ModalFooter({ children, actions, theme }) {
  return (
    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
      {children
        ? ({ children })
        : (
          actions
            .sort((action) => { return action.primary == true; })
            .map((action) => (<Action actions={action} key={`${action.label}`} />))
        )
      }
    </div>
  )
}
