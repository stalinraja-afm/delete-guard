import type { Register } from 'claude-code'

// Shell-level deletes: rm, del, Remove-Item, DROP/TRUNCATE in SQL, forced
// branch deletion, a remote branch delete push.
const BASH_DELETE =
  /\brm\b|\bdel\b|Remove-Item|DROP\s+(TABLE|DATABASE|SCHEMA)|TRUNCATE\s+TABLE|git\s+branch\s+-D|git\s+push\s+[^\n]*--delete/i

// Any tool (built-in or MCP) whose own name says it deletes, trashes,
// removes, or drops something (delete_records_for_table, trash_thread,
// delete_draft, drop_table, ...).
const NAMED_DELETE = /delete|trash|remove|drop/i

export const register: Register = on => {
  on('tool.call', async ($, e, next) => {
    const isBashDelete = e.tool === 'Bash' && BASH_DELETE.test(e.command)
    const isNamedDelete = e.tool !== 'Bash' && NAMED_DELETE.test(e.tool)

    if (!isBashDelete && !isNamedDelete) return next(e)

    const target = e.tool === 'Bash' ? e.command : e.tool

    const choice = await $.ui
      .ask(`Delete command detected:\n${target}\n\nRun it?`, ['Delete it', 'Cancel'])
      .catch(() => 'Cancel')

    return choice === 'Delete it'
      ? next(e)
      : { deny: `${$.plugin.name}: cancelled — you chose not to run this delete.` }
  })
}
