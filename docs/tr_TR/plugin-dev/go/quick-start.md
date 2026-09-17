# Creating a new project

Pumpkin plugins use the [Go](https://go.dev/) programming language and are compiled to WebAssembly.

## Prerequisites

Before we can start, make sure you have the following installed:
- [Go](https://go.dev/doc/install) (latest version recommended)
- [TinyGo](https://tinygo.org/getting-started/install/) (required for WASM compilation)

## Initializing a new module

First, create a new directory for your project and initialize a Go module:

```bash
mkdir hello-pumpkin
cd hello-pumpkin
go mod init github.com/yourname/hello-pumpkin
```

Next, add the Pumpkin Go API as a dependency:

```bash
go get github.com/Pumpkin-MC/pumpkin-api-go
```

## Project Structure

Your project should have at least a `main.go` file. The structure should look like this:

```text
├── go.mod
├── go.sum
└── main.go
```
