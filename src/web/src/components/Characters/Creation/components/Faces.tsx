import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as Branding from 'components/Branding';
import CreationPane from './CreationPane';
import Accordion from 'components/Global/Accordions';

import { FaceBox, FaceImg, FaceWrapper, SelectionWrapper } from './styles/face';

import { CheckmarkCircle } from 'react-ionicons';
import ICharacter from 'components/Characters/Selection/Character.interface';

interface IArgs {
    goBack: () => void;
    goNext: () => void;
    updateCharacter: (newCharacter: ICharacter) => void;
    character: ICharacter;
}

const CharacterFaces: React.FC<IArgs> = ({
    goBack,
    goNext,
    updateCharacter,
    character,
}) => {
    const [selectedPrimary, setSelectedPrimary] = useState(
        character.skin.primaryFace,
    );
    const [selectedSecondary, setSelectedSecondary] = useState(
        character.skin.secondaryFace,
    );

    const [t] = useTranslation('common');

    useEffect(() => {
        character.skin.primaryFace = selectedPrimary;
        character.skin.secondaryFace = selectedSecondary;
        updateCharacter(character);
    }, [selectedPrimary, selectedSecondary]);

    const renderFaces = (
        currentValue: number,
        setter: (val: number) => void,
    ) => {
        const list = [];

        for (let i = 0; i < 45; i++) {
            list.push(i);
        }
        return (
            <>
                {list.map((index) => (
                    <FaceBox
                        key={`face-${index}`}
                        onClick={() => setter(index)}
                    >
                        <FaceImg
                            src={
                                require(`../../../../resources/img/head/Face-${index}.jpg`)
                                    .default
                            }
                        />
                        {currentValue === index && (
                            <SelectionWrapper>
                                <CheckmarkCircle
                                    color="#FFF"
                                    style={{ marginRight: '10px' }}
                                />
                            </SelectionWrapper>
                        )}
                    </FaceBox>
                ))}
            </>
        );
    };

    return (
        <CreationPane
            title={t('characters.creation.faces.title')}
            onPrevious={goBack}
            onNext={goNext}
        >
            <Branding.Fonts.Texts.Medium>
                {t('characters.warning')}
            </Branding.Fonts.Texts.Medium>

            <Accordion
                title={`${t('characters.creation.faces.seeFaces')} (${t(
                    'characters.creation.faces.father',
                )})`}
                customStyle="width: 100%;max-width: 100%;"
            >
                <Branding.Fonts.Texts.Medium
                    customStyle={'margin-bottom: 20px;'}
                >
                    {t('characters.creation.faces.clickToSelect')}
                </Branding.Fonts.Texts.Medium>

                <FaceWrapper>
                    {renderFaces(selectedPrimary, setSelectedPrimary)}
                </FaceWrapper>
            </Accordion>
            <Accordion
                title={`${t('characters.creation.faces.seeFaces')} (${t(
                    'characters.creation.faces.mother',
                )})`}
                customStyle="width: 100%;max-width: 100%; margin-top: 20px;"
            >
                <Branding.Fonts.Texts.Medium
                    customStyle={'margin-bottom: 20px;'}
                >
                    {t('characters.creation.faces.clickToSelect')}
                </Branding.Fonts.Texts.Medium>

                <FaceWrapper>
                    {renderFaces(selectedSecondary, setSelectedSecondary)}
                </FaceWrapper>
            </Accordion>
        </CreationPane>
    );
};

export default CharacterFaces;
