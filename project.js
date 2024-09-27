const popupData = {
    water: {
        title: "Water Conservation Initiative by Jal Bhagirathi Foundation",
        image: "https://images.unsplash.com/photo-1567600191322-df4e4fd636b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        location: "Rajasthan, India",
        summary: "Jal Bhagirathi Foundation (JBF) focuses on water conservation in the Thar Desert by constructing check dams, promoting traditional rainwater harvesting methods, and engaging communities in water management...",
        howItWorks: "The foundation builds check dams and promotes the restoration of traditional water bodies like johads and baolis. They also empower local communities to manage water resources sustainably...",
        whyWeChoseIt: "Water scarcity in Rajasthan’s arid regions affects livelihoods, agriculture, and basic living conditions. This initiative aims to provide sustainable solutions by restoring water systems and creating awareness for water-efficient practices..."
    },
    sun: {
        title: "Bhadla Solar Park",
        image: "bhadla.jpg",
        location: "Bhadla, Rajasthan, India",
        summary: "Bhadla Solar Park is the world's largest solar power plant, located in the arid region of Rajasthan. This massive solar project covers over 14,000 acres and has an installed capacity of 2,245 MW, providing clean, renewable energy to millions of people in India. The park is a crucial part of India's mission to increase its solar energy capacity to meet climate goals and energy demands.",
        howItWorks: "The Bhadla Solar Park utilizes photovoltaic (PV) solar panels to convert sunlight directly into electricity. These PV cells generate electricity by allowing photons from sunlight to knock electrons into a higher state of energy, thereby creating electricity. The electricity generated is fed into the national grid, providing power to numerous regions across the country. Due to Rajasthan’s high solar insolation levels, the park operates efficiently and consistently throughout the year.",
        whyWeChoseIt: "Bhadla Solar Park plays a pivotal role in India’s renewable energy strategy. It not only helps to meet India's growing energy needs but also significantly reduces carbon emissions by replacing coal-based energy. The project provides thousands of jobs and has transformed the surrounding barren land into a hub for green energy. It aligns with India’s goal to generate 100 GW of solar power by 2022, making it a cornerstone of the nation's clean energy transition."
    },
    panel: {
        title: " Pavagada Solar Park",
        image: "pavagada.jpg",
        location: "Pavagada, Karnataka, India",
        summary: "avagada Solar Park, also known as 'Shakti Sthala,' is one of the largest solar parks in the world, located in the Tumkur district of Karnataka. Spread over 13,000 acres, this solar park has a generation capacity of 2,050 MW. It represents India's determination to shift towards renewable energy sources and aims to supply affordable, clean electricity to millions of households.",
        howItWorks: "This solar park harnesses energy from the sun using large arrays of photovoltaic panels, which convert sunlight into direct current (DC) electricity. This DC electricity is then converted to alternating current (AC) for use in the national grid. The project’s strategic location ensures high solar irradiance throughout the year, ensuring maximum efficiency and energy output.",
        whyWeChoseIt: "The Pavagada Solar Park was developed to reduce dependency on traditional energy sources and address India’s growing energy demands in an environmentally sustainable way. This project offers a livelihood to thousands of farmers who leased their land to set up the solar park. The park’s establishment has brought prosperity to the region, created job opportunities, and provided clean energy to millions. It is also a significant step toward meeting India's commitment to the Paris Climate Agreement."
    },
    battery: {
        title: "Rewa Solar Power Project",
        image: "reva.jpeg",
        location: "Rewa, Madhya Pradesh, India",
        summary: "The Rewa Ultra Mega Solar Power Project, located in the state of Madhya Pradesh, is one of the largest solar parks in India, with an installed capacity of 750 MW. It is known for producing some of the lowest solar tariffs in India, making it a significant milestone in the country's renewable energy journey. A portion of the energy produced here powers Delhi Metro, marking a major step in clean public transportation.",
        howItWorks: "Rewa Solar Park uses photovoltaic technology to capture solar energy and convert it into electricity. The solar panels absorb sunlight and convert it into electrical energy through the photovoltaic effect. This project is grid-connected, feeding clean power to industries, businesses, and households, as well as powering a major public transportation system.",
        whyWeChoseIt: "Rewa Solar Project demonstrates India’s capability to deliver large-scale, low-cost renewable energy solutions. The project stands out for its competitive solar tariffs, and its success has encouraged other states to invest in solar power. It is a landmark in the transition to sustainable energy for urban infrastructure, with a portion of its power supply dedicated to Delhi Metro, reducing its carbon footprint. The Rewa project serves as a model for the development of future large-scale solar initiatives across India."
    },
    cookstove: {
        title: "Clean Cookstoves Initiative by The Energy and Resources Institute (TERI)",
        image: "https://www.teriin.org/sites/default/files/2018-04/clean-cooking-og.jpg",
        location: "Rural areas in India",
        summary: "TERI’s clean cookstove project provides energy-efficient, low-emission cooking solutions to rural communities in India that traditionally rely on biomass for cooking...",
        howItWorks: "TERI distributes specially designed cookstoves that use less fuel and produce significantly lower emissions. These stoves reduce indoor air pollution, saving families time and money while improving health outcomes...",
        whyWeChoseIt: "Traditional cooking methods in rural India contribute to respiratory diseases and deforestation. By implementing clean cookstoves, this initiative tackles these challenges, improves quality of life, and helps reduce carbon emissions..."
    }
};

function openPopup(iconType) {
    const data = popupData[iconType];
    if (data) {
        const popupContent = document.getElementById('popupContent');
        popupContent.innerHTML = `
            <img src="${data.image}" alt="${data.title}" class="header-image">
            <h1>${data.title}</h1>
            <p class="location">${data.location}</p>
            
            <div class="section">
                <h2>Summary</h2>
                <p>${data.summary}</p>
            </div>
            
            <div class="section">
                <h2>How it works</h2>
                <p>${data.howItWorks}</p>
            </div>
            
            <div class="section why-we-chose-it">
                <h2>Why we chose it</h2>
                <p>${data.whyWeChoseIt}</p>
            </div>
        `;
        document.getElementById('popup').style.display = 'block';
    } else {
        console.error(`No data found for icon type: ${iconType}`);
    }
}

function closePopup() {
    document.getElementById('popup').style.display = 'none';
}

// Close the popup if the user clicks outside of it
window.onclick = function(event) {
    var popup = document.getElementById('popup');
    if (event.target == popup) {
        popup.style.display = 'none';
    }
}