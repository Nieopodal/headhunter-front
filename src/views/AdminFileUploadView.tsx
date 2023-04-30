import React, {ChangeEvent, useState} from 'react';
import {Loader} from "../components/common/Loader";
import {GoBack} from "../components/common/GoBack";

export const AdminFileUploadView = () => {
    const [file, setFile] = useState<File>();
    const [isUploading, setIsUploading] = useState(false);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const handleUploadClick = async () => {
        if (!file) {
            return;
        }

        setIsUploading(true);

        try {

            const res = await fetch('https://httpbin.org/post', {
                method: 'POST',
                body: file,
                // 👇 Ustawienie nagłówków
                headers: {
                    'content-type': file.type,
                    'content-length': `${file.size}`, // 👈 Nagłówki muszą być stringiem
                },
            });
            const response = await res.json();
            console.log(response);
            if (response.isSuccess === "true") {
                return <h1>Zaktualizowano bazę kursantów</h1>// 👈 Obsługa sukcesu
            }

        } catch (e: unknown) {
            if (e instanceof Error)
                throw new Error(e.message); // 👈 Obsługa błędu
        } finally {
            setIsUploading(false);
        }
    };

    if (isUploading) {
        return <div className="flex flex-col items-center h-screen w-full"><Loader/></div>;
    }

    return <div className="flex flex-col items-center justify-start w-full mt-10">
            <div className="">
                <div className="mb-7"><GoBack/></div>
                <div className="flex flex-col">
                    <div className="flex flex-col justify-start mb-10">
                        <h1 className="text-2xl font-bold">Dodawanie kursantów do bazy danych</h1>
                        <p className="text-base font-normal">Skorzystaj z poniższego pola, aby wysłać plik .csv</p>
                    </div>
                    <div>
                        <input type="file" className="file-input file-input-bordered w-full max-w-xs"
                               onChange={handleFileChange}/>

                        <button className="btn-md mx-10 btn-primary normal-case font-normal text-base rounded-none"
                                onClick={handleUploadClick}>Prześlij plik
                        </button>
                    </div>
                </div>
            </div>
        </div>
};