import React, { useState } from "react";
import "./styles.css";
import { InputTodo } from "./compornents/InputTodo";
import { IncompleteTodos } from "./compornents/IncompleteTodos";
import { CompleteTodos } from "./compornents/CompleteTodos";

export const App = () => {
  //TODO追加リスト
  const [todoText, setTodoText] = useState("");
  //未完了のリスト
  const [incompleteTodos, setIncompleteTodos] = useState([]);
  //完了のリスト
  const [completeTodos, setCompleteTodos] = useState([]);

  //入力したテキストの値
  const onChangeTodoText = (event) => setTodoText(event.target.value);

  //入力エリアの追加ボタンをクリックした時の処理,未完了リストへの追加処理
  const onClickAdd = () => {
    if (todoText === "") return;
    const newTodos = [...incompleteTodos, todoText];
    setIncompleteTodos(newTodos);
    setTodoText("");
  };

  //削除ボタンを押したときの処理
  const onClickDelete = (index) => {
    const newTodos = [...incompleteTodos];
    newTodos.splice(index, 1); //指定したindex番号を１つ削除する
    //実行
    setIncompleteTodos(newTodos);
  };

  //完了ボタンを押したときの処理
  const onClickComplete = (index) => {
    const newIncompleteTodos = [...incompleteTodos];
    newIncompleteTodos.splice(index, 1); //指定したindex番号を１つ削除する

    //完了リストへの追加
    const newCompleteTodos = [...completeTodos, incompleteTodos[index]];

    //未完了のリストからの削除と完了リストからの削除を実行
    setIncompleteTodos(newIncompleteTodos);
    setCompleteTodos(newCompleteTodos);
  };

  //戻すボタンを押した時の処理
  const onClickBack = (index) => {
    //完了リストの要素を取得して完了リストから削除する定義
    const newCompleteTodos = [...completeTodos];
    newCompleteTodos.splice(index, 1); //指定したindex番号を１つ削除する

    //未完了リストへの追加の定義
    const newIncompleteTodos = [...incompleteTodos, completeTodos[index]];

    //完了リストからの削除と未完了リストへの追加を実行
    setCompleteTodos(newCompleteTodos);
    setIncompleteTodos(newIncompleteTodos);
  };

  //ブラウザ表示部分
  return (
    <>
      <InputTodo
        todoText={todoText}
        onChange={onChangeTodoText}
        onClick={onClickAdd}
        disabled={incompleteTodos.length >= 5}
      />

      {incompleteTodos.length >= 5 && (
        <p style={{ color: "red" }}>登録できるTODOは5個まで</p>
      )}

      <IncompleteTodos
        todos={incompleteTodos}
        onClickComplete={onClickComplete}
        onClickDelete={onClickDelete}
      />

      <CompleteTodos todos={completeTodos} onClickBack={onClickBack} />
    </>
  );
};
