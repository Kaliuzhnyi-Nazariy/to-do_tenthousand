// import CreateTodo from "@/components/CreateTodo";
import CreateToDoModal from "@/components/Modal/CreateToDoModal";
import Search from "@/components/Search";
import TodoList from "@/components/TodoList";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="flex flex-col flex-1 h-full min-h-0 w-full max-w-3xl items-center mx-auto md:max-h-[80vh] ">
      <h1>TO-DO</h1>
      <Suspense fallback={null}>
        <Search />
        <CreateToDoModal />
        <TodoList />
      </Suspense>
    </main>
  );
}
