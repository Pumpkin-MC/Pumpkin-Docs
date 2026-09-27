---
title: Interface scheduler
outline: [2, 2]
---

# Interface `scheduler`

Host import: `pumpkin:plugin/scheduler@0.1.0`

[Package summary](./)

Source: [scheduler.wit](https://github.com/Pumpkin-MC/pumpkin-plugin-wit/blob/master/v0.1/scheduler.wit)

Delayed and repeating tasks; cancellation.

## Operation Summary

| Scope | Operation | Description |
| --- | --- | --- |
| `scheduler` | [`cancel-task`](#operation-scheduler-cancel-task) | Cancels a scheduled task if it hasn't finished yet. |
| `scheduler` | [`schedule-delayed-task`](#operation-scheduler-schedule-delayed-task) | Schedules a task to be executed once after the specified number of ticks. |
| `scheduler` | [`schedule-repeating-task`](#operation-scheduler-schedule-repeating-task) | Schedules a task to be executed repeatedly. |

## Operation Details

### `scheduler.schedule-delayed-task` {#operation-scheduler-schedule-delayed-task}

```text
schedule-delayed-task: func(handler-id: u32, delay-ticks: u64) -> u32;
```

Schedules a task to be executed once after the specified number of ticks.


Returns a unique task ID that can be used to cancel the task.

**Parameters**

| Name | WIT type | Description |
| --- | --- | --- |
| `handler-id` | `u32` | The unique ID of the handler to call when the task executes. |
| `delay-ticks` | `u64` | The number of game ticks to wait before execution (20 ticks = 1 second). |

**Returns:** `u32`

### `scheduler.schedule-repeating-task` {#operation-scheduler-schedule-repeating-task}

```text
schedule-repeating-task: func(handler-id: u32, delay-ticks: u64, period-ticks: u64) -> u32;
```

Schedules a task to be executed repeatedly.


Returns a unique task ID that can be used to cancel the task.

**Parameters**

| Name | WIT type | Description |
| --- | --- | --- |
| `handler-id` | `u32` | The unique ID of the handler to call when the task executes. |
| `delay-ticks` | `u64` | The number of game ticks to wait before the first execution. |
| `period-ticks` | `u64` | The number of game ticks between subsequent executions. |

**Returns:** `u32`

### `scheduler.cancel-task` {#operation-scheduler-cancel-task}

```text
cancel-task: func(task-id: u32);
```

Cancels a scheduled task if it hasn't finished yet.

**Parameters**

| Name | WIT type | Description |
| --- | --- | --- |
| `task-id` | `u32` | The ID of the task to cancel. |
