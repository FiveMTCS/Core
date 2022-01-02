import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as Branding from 'components/Branding';
import CreationPane from './CreationPane';
import Accordion from 'components/Global/Accordions';

import { FaceBox, FaceImg, FaceWrapper, SelectionWrapper } from './styles/face';

import { CheckmarkCircle, CheckmarkOutline } from 'react-ionicons';
import { HairsBox, HairsImg, HairsWrapper } from './styles/hairs';
import { ColorsWrapper, ColorTear } from './styles/generic';

import ICharacter from 'components/Characters/Selection/Character.interface';

interface IArgs {
    goBack: () => void;
    goNext: () => void;
    updateCharacter: (newCharacter: ICharacter) => void;
    character: ICharacter;
}
const CharacterHairs: React.FC<IArgs> = ({
    goBack,
    goNext,
    updateCharacter,
    character,
}) => {
    const [selectedHairs, setSelectedHairs] = useState(character.skin.hairs);
    const [selectedPrimaryHairsColor, setSelectedPrimaryHairsColor] = useState(
        character.skin.hairsPrimaryColor,
    );
    const [selectedSecondaryHairsColor, setSelectedSecondaryHairsColor] =
        useState(character.skin.hairsSecondaryColor);

    const isMale = character.informations.sex === 1;

    const hairsColors = [
        { value: 0, color: '#1D1D1A' },
        { value: 2, color: '#4B392D' },
        { value: 4, color: '#7A3B1F' },
        { value: 6, color: '#A35631' },
        { value: 8, color: '#A96F49' },
        { value: 10, color: '#BD8D5E' },
        { value: 12, color: '#CBA66F' },
        { value: 14, color: '#E8BE78' },
        { value: 16, color: '#D09E6A' },
        { value: 18, color: '#993524' },
        { value: 20, color: '#9C1611' },
        { value: 22, color: '#D1381E' },
        { value: 24, color: '#C85831' },
        { value: 26, color: '#947A67' },
        { value: 28, color: '#D8C1AC' },
        { value: 30, color: '#734F61' },
        { value: 32, color: '#AD476A' },
        { value: 35, color: '#FFAEBC' },
        { value: 36, color: '#089A8D' },
        { value: 40, color: '#309060' },
        { value: 43, color: '#A3C015' },
        { value: 45, color: '#EEC85C' },
        { value: 48, color: '#FE8B10' },
        { value: 53, color: '#D40B0E' },
    ];

    const [t] = useTranslation('common');

    useEffect(() => {
        character.skin.hairs = selectedHairs;
        character.skin.hairsPrimaryColor = selectedPrimaryHairsColor;
        character.skin.hairsSecondaryColor = selectedSecondaryHairsColor;
        updateCharacter(character);
    }, [selectedHairs, selectedPrimaryHairsColor, selectedSecondaryHairsColor]);

    const renderHairs = (
        currentValue: number,
        setter: (val: number) => void,
    ) => {
        const list: number[] = [];

        for (let i = 0; i < 35; i++) if (i !== 23) list.push(i);

        return (
            <>
                {list.map((index) => (
                    <HairsBox
                        key={`hairs-${index}`}
                        onClick={() => setter(index)}
                    >
                        <HairsImg
                            src={
                                require(`../../../../resources/img/hair/${
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
                    </HairsBox>
                ))}
            </>
        );
    };

    return (
        <CreationPane
            title={t('characters.creation.hairs.title')}
            onPrevious={goBack}
            onNext={goNext}
        >
            <Accordion
                title={t('characters.creation.hairs.seeHairs')}
                customStyle="width: 100%;max-width: 100%;"
            >
                <Branding.Fonts.Texts.Medium
                    customStyle={'margin-bottom: 20px;'}
                >
                    {t('characters.creation.hairs.clickToSelect')}
                </Branding.Fonts.Texts.Medium>

                <HairsWrapper>
                    {renderHairs(selectedHairs, setSelectedHairs)}
                </HairsWrapper>
            </Accordion>

            <Accordion
                title={t('characters.creation.hairs.primaryColor')}
                customStyle="width: 100%;max-width: 100%; margin-top: 20px;"
            >
                <Branding.Fonts.Texts.Medium
                    customStyle={'margin-bottom: 20px;'}
                >
                    {t('characters.creation.hairs.selectPrimaryColor')}
                </Branding.Fonts.Texts.Medium>

                <ColorsWrapper>
                    {hairsColors.map((color) => (
                        <ColorTear
                            key={`primary-${color.value}`}
                            color={color.color}
                            onClick={() =>
                                setSelectedPrimaryHairsColor(color.value)
                            }
                        >
                            {selectedPrimaryHairsColor === color.value && (
                                <CheckmarkOutline
                                    color={Branding.Colors.Gray.offWhite}
                                    style={{ marginTop: '7px' }}
                                />
                            )}
                        </ColorTear>
                    ))}
                </ColorsWrapper>
            </Accordion>

            <Accordion
                title={t('characters.creation.hairs.secondaryColor')}
                customStyle="width: 100%;max-width: 100%; margin-top: 20px;"
            >
                <Branding.Fonts.Texts.Medium
                    customStyle={'margin-bottom: 20px;'}
                >
                    {t('characters.creation.hairs.selectSecondaryColor')}
                </Branding.Fonts.Texts.Medium>

                <ColorsWrapper>
                    {hairsColors.map((color) => (
                        <ColorTear
                            key={`secondary-${color.value}`}
                            color={color.color}
                            onClick={() =>
                                setSelectedSecondaryHairsColor(color.value)
                            }
                        >
                            {selectedSecondaryHairsColor === color.value && (
                                <CheckmarkOutline
                                    color={Branding.Colors.Gray.offWhite}
                                    style={{ marginTop: '7px' }}
                                />
                            )}
                        </ColorTear>
                    ))}
                </ColorsWrapper>
            </Accordion>
        </CreationPane>
    );
};

export default CharacterHairs;
