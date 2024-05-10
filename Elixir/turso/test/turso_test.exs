defmodule TursoTest do
  use ExUnit.Case
  doctest Turso

  test "greets the world" do
    assert Turso.hello() == :world
  end
end
