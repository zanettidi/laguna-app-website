#!/usr/bin/env bash
#
# Laguna Systems — gestão do servidor local de desenvolvimento
#
# Uso:
#   ./server.sh start [porta]   Arranca o servidor (porta por omissão: 8000)
#   ./server.sh stop            Para o servidor
#   ./server.sh restart [porta] Reinicia o servidor
#   ./server.sh status          Mostra o estado do servidor
#
set -euo pipefail

# Diretório do projeto (onde está este script)
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PID_FILE="$ROOT_DIR/.server.pid"
LOG_FILE="$ROOT_DIR/.server.log"
DEFAULT_PORT=8000

# Escolhe o interpretador de Python disponível
if command -v python3 >/dev/null 2>&1; then
  PY=python3
elif command -v python >/dev/null 2>&1; then
  PY=python
else
  echo "Erro: Python não encontrado. Instale o Python 3 para continuar." >&2
  exit 1
fi

is_running() {
  [[ -f "$PID_FILE" ]] && kill -0 "$(cat "$PID_FILE")" 2>/dev/null
}

start() {
  local port="${1:-$DEFAULT_PORT}"

  if is_running; then
    echo "O servidor já está a correr (PID $(cat "$PID_FILE")). Use './server.sh status'."
    exit 0
  fi

  echo "A arrancar o servidor em http://localhost:$port ..."
  ( cd "$ROOT_DIR" && exec "$PY" -m http.server "$port" ) >"$LOG_FILE" 2>&1 &
  echo $! > "$PID_FILE"

  sleep 1
  if is_running; then
    echo "Servidor iniciado (PID $(cat "$PID_FILE"))."
    echo "  Site:  http://localhost:$port"
    echo "  Logs:  $LOG_FILE"
    echo "  Parar: ./server.sh stop"
  else
    echo "Falha ao arrancar o servidor. Verifique os logs:" >&2
    cat "$LOG_FILE" >&2
    rm -f "$PID_FILE"
    exit 1
  fi
}

stop() {
  if ! is_running; then
    echo "O servidor não está a correr."
    rm -f "$PID_FILE"
    exit 0
  fi

  local pid
  pid="$(cat "$PID_FILE")"
  echo "A parar o servidor (PID $pid) ..."
  kill "$pid" 2>/dev/null || true

  # Espera até 5s pelo encerramento; força se necessário
  for _ in 1 2 3 4 5; do
    kill -0 "$pid" 2>/dev/null || break
    sleep 1
  done
  kill -0 "$pid" 2>/dev/null && kill -9 "$pid" 2>/dev/null || true

  rm -f "$PID_FILE"
  echo "Servidor parado."
}

status() {
  if is_running; then
    echo "Servidor a correr (PID $(cat "$PID_FILE"))."
  else
    echo "Servidor parado."
  fi
}

case "${1:-}" in
  start)   start "${2:-}" ;;
  stop)    stop ;;
  restart) stop; start "${2:-}" ;;
  status)  status ;;
  *)
    echo "Uso: ./server.sh {start|stop|restart|status} [porta]" >&2
    exit 1
    ;;
esac
