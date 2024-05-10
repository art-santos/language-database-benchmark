Mix.install([
    {:req, "~> 0.4.1"}
])

{time, result} = :timer.tc(fn ->
    Req.get("https://elixir-lang.org")
  end)

time_in_ms = time / 1_000
IO.puts("Execution time in milliseconds: #{time_in_ms}")


{time, result} = :timer.tc(fn ->
    Req.get("https://elixir-lang.org")
  end)

defmodule Counter do
    def count(n, max) when n < max do
      IO.puts(n)
      count(n+1, max)
    end

    def count(_, _), do: :ok
  end

  Counter.count(0, 10)

  time_in_ms = time / 1_000
  IO.puts("Execution time in milliseconds: #{time_in_ms}")
