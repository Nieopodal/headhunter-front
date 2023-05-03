import {StarsSection} from "../components/CvSections/StarsSection";
import {TitleOfSection} from "../components/CvSections/TitleOfSection";
import {BodyOfSection} from "../components/CvSections/BodyOfSection";
import {ExpectationCategory} from "../components/CvSections/ExpectationCategory";
import {OneLink} from "../components/CvSections/OneLink";

export const StudentCvView = () => {

    return <>
        <TitleOfSection title="Oceny"/>
        <BodyOfSection>
            <StarsSection title="Ocena przejścia kursu" amount={3}/>
            <StarsSection title="Ocena aktywności i zaangażowania na kursie" amount={4}/>
            <StarsSection title="Ocena kodu w projekcie własnym" amount={3}/>
            <StarsSection title="Ocena pracy w zespole Scrum" amount={5}/>
        </BodyOfSection>

        <TitleOfSection title="Oczekiwanie w stosunku do zatrudnienia"/>
        <BodyOfSection>
            <ExpectationCategory title="Preferowane miejsce pracy" body="Biuro"/>
            <ExpectationCategory title="Docelowe miasto, gdzie chce pracować kandydat" body="Warszawa"/>
            <ExpectationCategory title="Oczekiwany typ kontraktu" body="Umowa o pracę"/>
            <ExpectationCategory title="Oczekiwane wynagrodzenie miesięczne netto" body="8000 zł"/>
            <ExpectationCategory title="Zgoda na odbycie miesięcznych praktyk/stażu na początek" body="TAK"/>
            <ExpectationCategory title="Komercyjne doświadczenie w programowaniu" body="6 miesięcy"/>
        </BodyOfSection>

        <TitleOfSection title="Edukacja"/>
        <BodyOfSection>
            <div className="text-base">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur.
            </div>

        </BodyOfSection>

        <TitleOfSection title="Kursy"/>
        <BodyOfSection>
            <div className="text-base">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur.
            </div>
        </BodyOfSection>

        <TitleOfSection title="Doświadczenie zawodowe"/>
        <BodyOfSection>
            <div className="text-base">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur.
            </div>
        </BodyOfSection>

        <TitleOfSection title="Portfolio"/>
        <BodyOfSection color="#0B8BD4">
            <div className="block">
                <OneLink url="https://google.com/test"/>
            </div>
        </BodyOfSection>

        <TitleOfSection title="Projekt w zespole Scrumowym"/>
        <BodyOfSection color="#0B8BD4">
            <div className="block">
                <OneLink url="https://google.com/test"/>
                <OneLink url="https://google.com/test"/>
            </div>
        </BodyOfSection>

        <TitleOfSection title="Projekt na zaliczenie"/>
        <BodyOfSection color="#0B8BD4">
            <div className="block">
                <OneLink url="https://google.com/test"/>
                <OneLink url="https://google.com/test"/>
            </div>
        </BodyOfSection>
    </>
};