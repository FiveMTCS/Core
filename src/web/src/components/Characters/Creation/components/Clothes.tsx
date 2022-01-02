import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as Branding from 'components/Branding';
import CreationPane from './CreationPane';

import { CheckmarkCircle } from 'react-ionicons';
import Accordion from 'components/Global/Accordions';
import {
    ClothesBox,
    TopsImg,
    SelectionWrapper,
    ClothesWrapper,
} from './styles/clothes';

import ICharacter from 'components/Characters/Selection/Character.interface';

interface IArgs {
    goBack: () => void;
    goNext: () => void;
    updateCharacter: (newCharacter: ICharacter) => void;
    character: ICharacter;
}

const CharacterClothes: React.FC<IArgs> = ({
    goBack,
    goNext,
    updateCharacter,
    character,
}) => {
    const [top, setSelectedTop] = useState(1);
    const [bottom, setSelectedBottom] = useState(1);

    const isMale = character.informations.sex;

    const [t] = useTranslation('common');

    const renderTops = (
        currentValue: number,
        setter: (val: number) => void,
    ) => {
        const list: number[] = [];

        const MAX = isMale ? 18 : 12;
        for (let i = 1; i < MAX; i++) list.push(i);

        return (
            <>
                {list.map((index) => (
                    <ClothesBox
                        key={`Tops-${index}`}
                        onClick={() => setter(index)}
                    >
                        <TopsImg
                            src={
                                require(`../../../../resources/img/tops/${
                                    isMale ? 'male' : 'female'
                                }/${index}.jpg`).default
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
                    </ClothesBox>
                ))}
            </>
        );
    };

    const renderBottoms = (
        currentValue: number,
        setter: (val: number) => void,
    ) => {
        const list: number[] = [];

        for (let i = 1; i < 8; i++) list.push(i);

        return (
            <>
                {list.map((index) => (
                    <ClothesBox
                        key={`Bottoms-${index}`}
                        onClick={() => setter(index)}
                    >
                        <TopsImg
                            src={
                                require(`../../../../resources/img/bottoms/${
                                    isMale ? 'male' : 'female'
                                }/${index}.jpg`).default
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
                    </ClothesBox>
                ))}
            </>
        );
    };

    return (
        <CreationPane
            title={t('characters.creation.clothes.title')}
            onPrevious={goBack}
            onNext={goNext}
        >
            <Accordion
                title={`${t('characters.creation.clothes.tops')}`}
                customStyle="width: 100%;max-width: 100%;"
            >
                <Branding.Fonts.Texts.Medium>
                    {t('characters.creation.clothes.topsClickToSelect')}
                </Branding.Fonts.Texts.Medium>

                <ClothesWrapper>
                    {renderTops(top, setSelectedTop)}
                </ClothesWrapper>
            </Accordion>
            <Accordion
                title={`${t('characters.creation.clothes.bottoms')}`}
                customStyle="width: 100%;max-width: 100%; margin-top: 20px;"
            >
                <Branding.Fonts.Texts.Medium>
                    {t('characters.creation.clothes.bottomsClickToSelect')}
                </Branding.Fonts.Texts.Medium>

                <ClothesWrapper>
                    {renderBottoms(bottom, setSelectedBottom)}
                </ClothesWrapper>
            </Accordion>
        </CreationPane>
    );
};

export default CharacterClothes;
