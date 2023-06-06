import { useState } from "react";

const Todo = ({ todo, handleSetComplete, handleDelete }) => {

    const { id, title, completed, createdAt } = todo;

    return (
        <div
            className="flex items-center justify-between p-4 bg-cyan-50 border-b border-solid border-cyan-400 "
        >
            <div className="flex items-center">
                {
                    completed ? (
                        <div onClick={() => handleSetComplete(id)} className="bg-cyan-500 p-1 rounded-full cursor-pointer">
                            <img
                                className="h-4 w-4 " src="/check-icon.svg" alt="Check Icon"
                            />
                        </div>
                    )
                        : (
                            <span onClick={() => handleSetComplete(id)} className={`border border-gray-500 border-solid p-3 rounded-full cursor-pointer`}>
                            </span>
                        )
                }
                <div className=" grid   grid-rows-2">
                <p className={"pl-3 " + (completed && "line-through")}>{title} </p>
                <p className={"pl-3  text-xs " }>{createdAt} </p>
                </div>
            </div>


            <img onClick={() => handleDelete(id)} className="h-5 w-5 cursor-pointer transition-all duration-300 ease-in" src="/close-icon.svg" alt="Close Icon" />
        </div>
    );
}

export { Todo } 
