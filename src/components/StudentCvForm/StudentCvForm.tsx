import {StudentCv} from "../../types/StudentCv";
import {Input} from "../common/Form/Input";
import React from "react";

interface Props {
    studentData: StudentCv;
}

export const StudentCvForm = ({studentData}: Props) => {

    return <form>
            <div className="w-[350px] flex flex-col">
                <div className="flex justify-center">
                </div>
                <div className="form-control gap-4 my-4">
                    <label> email:
                        <Input type="email" name="email" placeholder="E-mail"/>
                    </label>
                </div>
            </div>
    </form>
};