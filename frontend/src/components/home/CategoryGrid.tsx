/************************************************************[ IMPORTS ]*/
/************************************[ NPM MODULES ]*/
import { FC, ReactNode } from 'react';
/****************************************************/
/************************************************************************/


/***************************************************************[ GRID ]*/
export const CategoryGrid: FC = () => {
    /******************************************[ TYPES ]*/
    type Category = {
        id: string;
        name: string;
        image: string;
        link: string;
    };
    /****************************************************/

    /*****************************[ STATES & VARIABLES ]*/
    const line1: Category[] = [
        { id: 'about', name: 'A propos', image: '/assets/generic.png', link: '/about' },
        { id: 'shop', name: 'Boutique', image: '/assets/generic.png', link: '/shop' },
        { id: 'lessons', name: 'Cours de tournage et modelage', image: '/assets/generic.png', link: '/lessons' }
    ];

    const line2: Category[] = [
        { id: 'ceramic', name: 'Décor sur céramique', image: '/assets/generic.png', link: '/ceramic' },
        { id: 'offer', name: 'Pour offrir', image: '/assets/generic.png', link: '/offer' },
        { id: 'contact', name: 'Contact', image: '/assets/generic.png', link: '/contact' }
    ];
    /****************************************************/

    /*****************************************[ RETURN ]*/
    return (
        <div className='grid'>
            <div className='line'>
                {
                    line1.map((category: Category): ReactNode => (
                        <a
                            key={category.id}
                            href={category.link}
                        >
                            {category.name}
                        </a>
                    ))
                }
            </div>

            <div className='line'>
                {
                    line2.map((category: Category): ReactNode => (
                        <a
                            key={category.id}
                            href={category.link}
                        >
                            {category.name}
                        </a>
                    ))}
            </div>
        </div>
    );
    /****************************************************/
};
/************************************************************************/