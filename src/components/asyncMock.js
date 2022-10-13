const products = [
    {
        id:'1',
        name:'Nina Simone',
        album: 'I Put a Spell on You',
        price: 42,
        genre:'Jazz',
        image:'/images/NinaSimone-1.jpg',
        stock: 15,
        description:'Recorded in 1964 and 1965 in New York City, it was released by Philips Records in 1965. It peaked at number 99 on the Billboard 200 chart and number 9 on the UK Albums Chart.'
    },
    {
        id:'2',
        name:'Eagles',
        album:"Live at The Forum '76",
        price: 27,
        genre:'Rock',
        image:'/images/LiveAtTheForum-Eagles.webp',
        stock: 20,
        description:"Eagles LIVE AT THE FORUM '76, features 10 songs recorded in the Fall of 1976, just prior to the release of Hotel California. The live music takes up three LP sides while the final one features an exclusive etching of the artwork.-LIVE AT THE FORUM '76 was recorded during the band's three-night run at the Los Angeles Forum in October 1976."
    },
    {
        id:'3',
        name:'Tom Petty',
        album:"Greatest Hits",
        price: 29,
        genre:'Rock',
        image:'/images/GreatestsHits-TomPetty.webp',
        stock: 10,
        description: "The album contains nineteen classics including 'American Girl,' 'Refugee,' 'Don't Come Around Here No More' and many others."
    },
    {
        id:'4',
        name:'Taylor Swift',
        album:"Midnights",
        price: 30,
        genre:'Pop',
        image:'/images/taylor-swift-midnights.jpeg',
        stock: 10,
        description:"Midnights, the stories of 13 sleepless nights scattered throughout my life, will be out October 21. Meet me at midnight."
    }
]

export const getProducts = () => {
    return new Promise((res) => {
        setTimeout(() => {
            res(products)
        }, 2000)
    })
}

export const getProductById = (id) => {
    return new Promise((res) => {
        setTimeout(() => {
            res(products.find(prod => prod.id === id))
        }, 2000)
    })
}