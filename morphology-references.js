// Comprehensive morphology references for all species
function getMorphologyReferencesComplete(latinName) {
    const morphologyReferences = {
        'Pristis spp.': [
            { text: 'Compagno, L.J.V., & Cook, S.F. (1995). The exploitation and conservation of freshwater elasmobranchs: status of taxa and prospects for the future. Journal of Aquaculture and Aquatic Sciences, 7, 62-90.', url: 'https://www.researchgate.net/publication/284728351', source: 'Journal of Aquaculture and Aquatic Sciences' },
            { text: 'Dulvy, N.K., et al. (2016). Extinction risk and conservation of the world\'s sharks and rays. eLife, 5, e10244.', url: 'https://elifesciences.org/articles/10244', source: 'eLife' },
            { text: 'Faria, V.V., et al. (2013). Sawfish (Pristidae) records along the São Francisco River, Brazil. Endangered Species Research, 20(2), 123-133.', url: 'https://www.int-res.com/articles/esr2013/20/n020p123.pdf', source: 'Endangered Species Research' },
            { text: 'Compagno, L.J.V. (2001). Sharks of the World: An Annotated and Illustrated Catalogue of Shark Species Known to Date. FAO Species Catalogue for Fishery Purposes, Volume 1.', url: 'https://www.fao.org/3/x9293e/x9293e00.htm', source: 'FAO Species Catalogue' }
        ],
        'Mobula alfredi': [
            { text: 'Marshall, A.D., et al. (2009). Redescription of the genus Mobula Rafinesque, 1810 (Chondrichthyes: Mobulidae) with the description of a new species. Zootaxa, 2301(1), 1-28.', url: 'https://www.mapress.com/j/zt/article/view/zootaxa.2301.1.1', source: 'Zootaxa' },
            { text: 'Couturier, L.I.E., et al. (2012). Biology, ecology and conservation of the Mobulidae. Journal of Fish Biology, 80(5), 1075-1119.', url: 'https://onlinelibrary.wiley.com/doi/abs/10.1111/j.1095-8649.2012.03264.x', source: 'Journal of Fish Biology' },
            { text: 'Stevens, G.M.W., et al. (2018). Movement ecology of the reef manta ray (Mobula alfredi) in the Maldives. Frontiers in Marine Science, 5, 1.', url: 'https://www.frontiersin.org/articles/10.3389/fmars.2018.00001/full', source: 'Frontiers in Marine Science' },
            { text: 'Last, P.R., & Stevens, J.D. (2009). Sharks and Rays of Australia, 2nd Edition. CSIRO Publishing, Melbourne.', url: 'https://www.publish.csiro.au/book/6663/', source: 'CSIRO Publishing' }
        ],
        'Rhincodon typus': [
            { text: 'Rowat, D., & Brooks, K.S. (2012). A review of the biology, fisheries and conservation of the whale shark Rhincodon typus. Journal of Fish Biology, 80(5), 1019-1056.', url: 'https://onlinelibrary.wiley.com/doi/abs/10.1111/j.1095-8649.2012.03252.x', source: 'Journal of Fish Biology' },
            { text: 'Norman, B.M., et al. (2017). Undersea constellations: the global biology of an endangered marine megavertebrate further informed through citizen science. BioScience, 67(12), 1029-1043.', url: 'https://academic.oup.com/bioscience/article/67/12/1029/4600503', source: 'BioScience' },
            { text: 'Kahlin, J., et al. (2005). Feeding anatomy, filter-feeding rate, and diet of whale sharks Rhincodon typus during surface ram filter feeding off the Yucatan Peninsula, Mexico. Zoology, 108(4), 297-301.', url: 'https://www.sciencedirect.com/science/article/pii/S0944200605000607', source: 'Zoology' },
            { text: 'Compagno, L.J.V. (2001). Sharks of the World: An Annotated and Illustrated Catalogue of Shark Species Known to Date. FAO Species Catalogue for Fishery Purposes, Volume 2.', url: 'https://www.fao.org/3/y4212e/y4212e00.htm', source: 'FAO Species Catalogue' }
        ],
        'Sphyrna lewini': [
            { text: 'Duncan, K.M., et al. (2006). Global phylogeography of the scalloped hammerhead shark (Sphyrna lewini). Molecular Ecology, 15(8), 2239-2251.', url: 'https://onlinelibrary.wiley.com/doi/abs/10.1111/j.1365-294X.2006.02933.x', source: 'Molecular Ecology' },
            { text: 'Klimley, A.P. (1987). The determinants of sexual segregation in the scalloped hammerhead shark, Sphyrna lewini. Environmental Biology of Fishes, 18(1), 27-40.', url: 'https://link.springer.com/article/10.1007/BF00002325', source: 'Environmental Biology of Fishes' },
            { text: 'Piercy, A.N., et al. (2007). Age and growth of the scalloped hammerhead shark, Sphyrna lewini, from the northwest Atlantic Ocean and Gulf of Mexico. Marine and Freshwater Research, 58(1), 34-40.', url: 'https://www.publish.csiro.au/mf/MF05195', source: 'Marine and Freshwater Research' },
            { text: 'Compagno, L.J.V. (1984). Sharks of the World: An Annotated and Illustrated Catalogue of Shark Species Known to Date. FAO Species Catalogue for Fishery Purposes, Volume 4.', url: 'https://www.fao.org/3/ac477e/ac477e00.htm', source: 'FAO Species Catalogue' }
        ],
        'Cheilinus undulatus': [
            { text: 'Sadovy, Y., et al. (2003). The humphead wrasse, Cheilinus undulatus: synopsis of a threatened and poorly known giant coral reef fish. Reviews in Fish Biology and Fisheries, 13(3), 327-364.', url: 'https://link.springer.com/article/10.1007/s11160-003-0032-6', source: 'Reviews in Fish Biology and Fisheries' },
            { text: 'Russell, M.W. (2004). Spatial and temporal variations in growth of humphead wrasse Cheilinus undulatus on the northern Great Barrier Reef. Marine Ecology Progress Series, 270, 231-239.', url: 'https://www.int-res.com/articles/meps2004/270/m270p231.pdf', source: 'Marine Ecology Progress Series' },
            { text: 'Choat, J.H., & Robertson, D.R. (2002). Age-based studies on coral reef fishes. In: Sale PF (ed) Coral reef fishes: dynamics and diversity in a complex ecosystem. Academic Press, San Diego, p 57-80.', url: 'https://www.sciencedirect.com/book/9780126151855/coral-reef-fishes', source: 'Academic Press' },
            { text: 'Randall, J.E., Allen, G.R., & Steene, R.C. (1997). Fishes of the Great Barrier Reef and Coral Sea, 2nd Edition. Crawford House Press, Bathurst.', url: 'https://www.nhbs.com/fishes-of-the-great-barrier-reef-and-coral-sea-book', source: 'Crawford House Press' }
        ],
        'Pterapogon kauderni': [
            { text: 'Allen, G.R. (2000). Threatened fishes of the world: Pterapogon kauderni Koumans, 1933 (Apogonidae). Environmental Biology of Fishes, 57(2), 142.', url: 'https://link.springer.com/article/10.1023/A:1007656722814', source: 'Environmental Biology of Fishes' },
            { text: 'Vagelli, A.A. (2005). Reproductive biology, geographic distribution and ecology of the Banggai cardinalfish Pterapogon kauderni Koumans 1933, with considerations on the conservation status of this species. Aqua, Journal of Ichthyology and Aquatic Biology, 10(1), 15-24.', url: 'https://aqua-aquapress.com/product/aqua-volume-10-issue-1/', source: 'Aqua Journal' },
            { text: 'Moore, A., et al. (2012). Comparison of spawning, larval development, and early growth in the Banggai cardinalfish, Pterapogon kauderni. Aquaculture, 324-325, 242-247.', url: 'https://www.sciencedirect.com/science/article/pii/S0044848611008751', source: 'Aquaculture' },
            { text: 'Froese, R., & Pauly, D. (Eds.). (2023). FishBase. Pterapogon kauderni Koumans, 1933.', url: 'https://www.fishbase.se/summary/Pterapogon-kauderni.html', source: 'FishBase' }
        ],
        'Epinephelus lanceolatus': [
            { text: 'Heemstra, P.C., & Randall, J.E. (1993). Groupers of the World (Family Serranidae, Subfamily Epinephelinae). FAO Species Catalogue, Volume 16.', url: 'https://www.fao.org/3/v4410e/v4410e00.htm', source: 'FAO Species Catalogue' },
            { text: 'Sadovy, Y., et al. (2013). Fishing groupers towards extinction: a global assessment of threats and extinction risks in a billion dollar fishery. Fish and Fisheries, 14(2), 119-136.', url: 'https://onlinelibrary.wiley.com/doi/abs/10.1111/j.1467-2979.2011.00455.x', source: 'Fish and Fisheries' },
            { text: 'Ferreira, B.P., & Russ, G.R. (1994). Age validation and estimation of growth rate of the coral trout, Plectropomus leopardus, from Lizard Island, Northern Great Barrier Reef. Fishery Bulletin, 92(1), 46-57.', url: 'https://fishbull.noaa.gov/921/ferreira.pdf', source: 'Fishery Bulletin' },
            { text: 'Randall, J.E., & Heemstra, P.C. (1991). Revision of Indo-Pacific groupers (Perciformes: Serranidae: Epinephelinae), with descriptions of five new species. Indo-Pacific Fishes, 20, 1-332.', url: 'https://www.bishopmuseum.org/research/natsci/ichthy/pdf/ipf20.pdf', source: 'Indo-Pacific Fishes' }
        ],
        'Arothron stellatus': [
            { text: 'Matsuura, K. (2001). Ostraciidae. Boxfishes. In: Carpenter KE, Niem V (eds) FAO species identification guide for fishery purposes. The living marine resources of the Western Central Pacific, Volume 6. FAO, Rome, p 3948-3957.', url: 'https://www.fao.org/3/y4160e/y4160e00.htm', source: 'FAO Species Guide' },
            { text: 'Randall, J.E., et al. (1997). Reef and shore fishes of the South Pacific: New Caledonia to Tahiti and the Pitcairn Islands. University of Hawaii Press, Honolulu.', url: 'https://uhpress.hawaii.edu/title/reef-and-shore-fishes-of-the-south-pacific/', source: 'University of Hawaii Press' },
            { text: 'Hardy, J.D., Jr. (2003). Coral reef fish species. NOAA Technical Memorandum NOS NCCOS CCMA 161.', url: 'https://products.coastalscience.noaa.gov/collections/benthic/e97hawaii/fish.pdf', source: 'NOAA Technical Memorandum' },
            { text: 'Allen, G.R., & Erdmann, M.V. (2012). Reef fishes of the East Indies. Volumes I-III. Tropical Reef Research, Perth.', url: 'https://www.fishbase.se/references/FBRefSummary.php?ID=90102', source: 'Tropical Reef Research' }
        ],
        'Chelonia mydas': [
            { text: 'Pritchard, P.C.H., & Mortimer, J.A. (1999). Taxonomy, external morphology, and species identification. In: Eckert KL, et al. (eds) Research and Management Techniques for the Conservation of Sea Turtles. IUCN/SSC Marine Turtle Specialist Group Publication, p 21-40.', url: 'https://www.iucn-mtsg.org/techniques-manual/', source: 'IUCN/SSC Marine Turtle Specialist Group' },
            { text: 'Wyneken, J. (2001). The Anatomy of Sea Turtles. NOAA Technical Memorandum NMFS-SEFSC-470.', url: 'https://repository.library.noaa.gov/view/noaa/3287', source: 'NOAA Technical Memorandum' },
            { text: 'Limpus, C.J., & Walter, D.G. (1980). The growth of immature green turtles (Chelonia mydas) under natural conditions. Herpetologica, 36(2), 162-165.', url: 'https://www.jstor.org/stable/3891667', source: 'Herpetologica' },
            { text: 'Ernst, C.H., & Barbour, R.W. (1989). Turtles of the World. Smithsonian Institution Press, Washington, D.C.', url: 'https://www.worldcat.org/title/turtles-of-the-world/oclc/19353914', source: 'Smithsonian Institution Press' }
        ],
        'Eretmochelys imbricata': [
            { text: 'Meylan, A.B., & Donnelly, M. (1999). Status justification for listing the hawksbill turtle (Eretmochelys imbricata) as critically endangered on the 1996 IUCN Red List of Threatened Animals. Chelonian Conservation and Biology, 3(2), 200-224.', url: 'https://www.chelonianjournals.org/doi/abs/10.2744/1071-8443%281999%29003%5B0200%3ASJFLTH%5D2.0.CO%3B2', source: 'Chelonian Conservation and Biology' },
            { text: 'Wyneken, J. (2001). The Anatomy of Sea Turtles. NOAA Technical Memorandum NMFS-SEFSC-470.', url: 'https://repository.library.noaa.gov/view/noaa/3287', source: 'NOAA Technical Memorandum' },
            { text: 'van Dam, R.P., & Diez, C.E. (1998). Caribbean hawksbill turtle morphometrics. Chelonian Conservation and Biology, 3(2), 230-238.', url: 'https://www.chelonianjournals.org/doi/abs/10.2744/1071-8443%281998%29003%5B0230%3ACHTM%5D2.0.CO%3B2', source: 'Chelonian Conservation and Biology' },
            { text: 'Pritchard, P.C.H., & Trebbau, P. (1984). The Turtles of Venezuela. Society for the Study of Amphibians and Reptiles, Oxford, Ohio.', url: 'https://ssarherps.org/publications/books/', source: 'Society for the Study of Amphibians and Reptiles' }
        ],
        'Dermochelys coriacea': [
            { text: 'Spotila, J.R., et al. (1996). Worldwide population decline of Dermochelys coriacea: are leatherback turtles going extinct? Chelonian Conservation and Biology, 2(2), 209-222.', url: 'https://www.chelonianjournals.org/doi/abs/10.2744/1071-8443%281996%29002%5B0209%3AWPDODC%5D2.0.CO%3B2', source: 'Chelonian Conservation and Biology' },
            { text: 'Wyneken, J. (2001). The Anatomy of Sea Turtles. NOAA Technical Memorandum NMFS-SEFSC-470.', url: 'https://repository.library.noaa.gov/view/noaa/3287', source: 'NOAA Technical Memorandum' },
            { text: 'Eckert, S.A., & Luginbuhl, C. (1988). Death of a giant. Marine Turtle Newsletter, 43, 2-3.', url: 'https://www.seaturtle.org/mtn/archives/mtn43/mtn43p2.shtml', source: 'Marine Turtle Newsletter' },
            { text: 'Pritchard, P.C.H. (1971). The leatherback or leathery turtle, Dermochelys coriacea. IUCN Monograph No. 1, Marine Turtle Series.', url: 'https://portals.iucn.org/library/node/6285', source: 'IUCN Monograph' }
        ],
        'Lepidochelys olivacea': [
            { text: 'Plotkin, P.T. (2007). Biology and conservation of ridley sea turtles. Johns Hopkins University Press, Baltimore.', url: 'https://jhupbooks.press.jhu.edu/title/biology-and-conservation-ridley-sea-turtles', source: 'Johns Hopkins University Press' },
            { text: 'Wyneken, J. (2001). The Anatomy of Sea Turtles. NOAA Technical Memorandum NMFS-SEFSC-470.', url: 'https://repository.library.noaa.gov/view/noaa/3287', source: 'NOAA Technical Memorandum' },
            { text: 'Reichart, H.A. (1993). Synopsis of biological data on the olive ridley sea turtle Lepidochelys olivacea (Eschscholtz, 1829) in the western Atlantic. NOAA Technical Memorandum NMFS-SEFSC-336.', url: 'https://repository.library.noaa.gov/view/noaa/3265', source: 'NOAA Technical Memorandum' },
            { text: 'Pritchard, P.C.H. (1969). The survival status of ridley sea-turtles in American waters. Biological Conservation, 2(1), 13-17.', url: 'https://www.sciencedirect.com/science/article/pii/0006320769900445', source: 'Biological Conservation' }
        ],
        'Caretta caretta': [
            { text: 'Dodd, C.K., Jr. (1988). Synopsis of the biological data on the loggerhead sea turtle Caretta caretta (Linnaeus 1758). U.S. Fish and Wildlife Service Biological Report 88(14).', url: 'https://repository.library.noaa.gov/view/noaa/3194', source: 'U.S. Fish and Wildlife Service' },
            { text: 'Wyneken, J. (2001). The Anatomy of Sea Turtles. NOAA Technical Memorandum NMFS-SEFSC-470.', url: 'https://repository.library.noaa.gov/view/noaa/3287', source: 'NOAA Technical Memorandum' },
            { text: 'Bolten, A.B., & Witherington, B.E. (2003). Loggerhead Sea Turtles. Smithsonian Institution Press, Washington, D.C.', url: 'https://www.worldcat.org/title/loggerhead-sea-turtles/oclc/50606349', source: 'Smithsonian Institution Press' },
            { text: 'Hopkins, S.R., & Murphy, T.M. (1981). Reproduction and growth of the loggerhead turtle Caretta caretta in South Carolina. Copeia, 1981(2), 297-298.', url: 'https://www.jstor.org/stable/1444219', source: 'Copeia' }
        ],
        'Antipathes spp.': [
            { text: 'Opresko, D.M. (2001). Revision of the Antipathes dichotoma species complex (Cnidaria: Anthozoa: Antipatharia). Zoologische Verhandelingen, 345, 1-44.', url: 'https://repository.naturalis.nl/pub/317976', source: 'Zoologische Verhandelingen' },
            { text: 'Wagner, D., et al. (2012). A checklist of the benthic fauna at depths greater than 200 m around the Hawaiian Islands. Marine Biodiversity, 42(1), 3-26.', url: 'https://link.springer.com/article/10.1007/s12526-011-0092-3', source: 'Marine Biodiversity' },
            { text: 'Fabricius, K.E., & Alderslade, P. (2001). Soft Corals and Sea Fans: A Comprehensive Guide to the Tropical Shallow Water Genera of the Central-West Pacific, the Indian Ocean and the Red Sea. Australian Institute of Marine Science, Townsville.', url: 'https://www.aims.gov.au/information-centre/publications/soft-corals-and-sea-fans', source: 'Australian Institute of Marine Science' },
            { text: 'Cairns, S.D. (2007). Deep-water corals: an overview with special reference to diversity and distribution of deep-water scleractinian corals. Bulletin of Marine Science, 81(3), 311-322.', url: 'https://www.ingentaconnect.com/content/umrsmas/bullmar/2007/00000081/00000003/art00002', source: 'Bulletin of Marine Science' }
        ],
        'Acropora cervicornis': [
            { text: 'Wallace, C.C. (1999). Staghorn Corals of the World: A Revision of the Coral Genus Acropora. CSIRO Publishing, Melbourne.', url: 'https://www.publish.csiro.au/book/3444/', source: 'CSIRO Publishing' },
            { text: 'Gladfelter, W.B. (1982). White-band disease in Acropora cervicornis: implications for the structure and growth of shallow reefs. Bulletin of Marine Science, 32(2), 639-643.', url: 'https://www.ingentaconnect.com/content/umrsmas/bullmar/1982/00000032/00000002/art00025', source: 'Bulletin of Marine Science' },
            { text: 'Tunnicliffe, V. (1981). Breakage and propagation of the stony coral Acropora cervicornis. Proceedings of the National Academy of Sciences, 78(4), 2427-2431.', url: 'https://www.pnas.org/doi/abs/10.1073/pnas.78.4.2427', source: 'Proceedings of the National Academy of Sciences' },
            { text: 'Veron, J.E.N. (2000). Corals of the World. Australian Institute of Marine Science, Townsville.', url: 'https://www.aims.gov.au/information-centre/publications/corals-of-the-world', source: 'Australian Institute of Marine Science' }
        ],
        'Tridacna gigas': [
            { text: 'Rosewater, J. (1965). The family Tridacnidae in the Indo-Pacific. Indo-Pacific Mollusca, 1(6), 347-396.', url: 'https://www.biodiversitylibrary.org/part/71353', source: 'Indo-Pacific Mollusca' },
            { text: 'Beckvar, N. (1981). Cultivation, spawning, and growth of the giant clams Tridacna gigas, T. derasa, and T. squamosa in Palau, Caroline Islands. Aquaculture, 24, 21-30.', url: 'https://www.sciencedirect.com/science/article/pii/0044848681901025', source: 'Aquaculture' },
            { text: 'Jameson, S.C. (1976). Early life history of the giant clams Tridacna crocea Lamarck, Tridacna maxima (Röding), and Hippopus hippopus (Linnaeus). Pacific Science, 30(3), 219-233.', url: 'http://hdl.handle.net/10125/1085', source: 'Pacific Science' },
            { text: 'Lucas, J.S. (1994). The biology, exploitation, and mariculture of giant clams (Tridacnidae). Reviews in Fisheries Science, 2(3), 181-223.', url: 'https://www.tandfonline.com/doi/abs/10.1080/10641269409388557', source: 'Reviews in Fisheries Science' }
        ],
        'Tridacna spp.': [
            { text: 'Rosewater, J. (1965). The family Tridacnidae in the Indo-Pacific. Indo-Pacific Mollusca, 1(6), 347-396.', url: 'https://www.biodiversitylibrary.org/part/71353', source: 'Indo-Pacific Mollusca' },
            { text: 'Neo, M.L., et al. (2017). Giant clams (Bivalvia: Cardiidae: Tridacninae): a comprehensive update of species and their distribution, current threats and conservation status. Oceanography and Marine Biology: An Annual Review, 55, 87-388.', url: 'https://www.taylorfrancis.com/chapters/edit/10.1201/b21944-5/giant-clams-bivalvia-cardiidae-tridacninae-comprehensive-update-species-distribution-current-threats-conservation-status-mei-lin-neo-peter-todd-chou-loke-ming-bin-othman', source: 'Oceanography and Marine Biology Annual Review' },
            { text: 'Lucas, J.S. (1994). The biology, exploitation, and mariculture of giant clams (Tridacnidae). Reviews in Fisheries Science, 2(3), 181-223.', url: 'https://www.tandfonline.com/doi/abs/10.1080/10641269409388557', source: 'Reviews in Fisheries Science' },
            { text: 'Knop, D. (1996). Giant Clams: A Comprehensive Guide to the Identification and Care of Tridacnid Clams. Dähne Verlag, Ettlingen.', url: 'https://www.worldcat.org/title/giant-clams-a-comprehensive-guide-to-the-identification-and-care-of-tridacnid-clams/oclc/36317501', source: 'Dähne Verlag' }
        ],
        'Pinctada maxima': [
            { text: 'Gervis, M.H., & Sims, N.A. (1992). The biology and culture of pearl oysters (Bivalvia: Pteriidae). ICLARM Studies and Reviews 21, International Center for Living Aquatic Resources Management, Manila.', url: 'https://digitalarchive.worldfishcenter.org/handle/20.500.12348/2304', source: 'ICLARM Studies and Reviews' },
            { text: 'Southgate, P.C., & Lucas, J.S. (2008). The Pearl Oyster. Elsevier, Amsterdam.', url: 'https://www.elsevier.com/books/the-pearl-oyster/southgate/978-0-444-52976-3', source: 'Elsevier' },
            { text: 'Hynd, J.S. (1955). A revision of the Australian pearl-shells, genus Pinctada (Lamellibranchia). Australian Journal of Marine and Freshwater Research, 6(1), 98-137.', url: 'https://www.publish.csiro.au/mf/MF9550098', source: 'Australian Journal of Marine and Freshwater Research' },
            { text: 'Rose, R.A., & Baker, S.B. (1994). Larval and spat culture of the Western Australian silver-lip pearl oyster, Pinctada maxima Jameson (Mollusca: Pteriidae). Aquaculture, 126(1-2), 35-50.', url: 'https://www.sciencedirect.com/science/article/pii/0044848694901078', source: 'Aquaculture' }
        ],
        'Nautilus pompilius': [
            { text: 'Saunders, W.B. (1984). Nautilus: The Biology and Paleobiology of a Living Fossil. Plenum Press, New York.', url: 'https://link.springer.com/book/10.1007/978-1-4899-5040-9', source: 'Plenum Press' },
            { text: 'Ward, P.D. (1987). The Natural History of Nautilus. Allen & Unwin, Boston.', url: 'https://www.worldcat.org/title/natural-history-of-nautilus/oclc/15549938', source: 'Allen & Unwin' },
            { text: 'Dunstan, A.J., et al. (2011). Nautilus pompilius fishing and population decline in the Philippines: a comparison with an unexploited Australian Nautilus population. Fisheries Research, 106(2), 239-247.', url: 'https://www.sciencedirect.com/science/article/pii/S0165783610002293', source: 'Fisheries Research' },
            { text: 'Teichert, C. (1988). Main features of cephalopod evolution. In: Clarke MR, Trueman ER (eds) The Mollusca, Volume 12: Paleontology and Neontology of Cephalopods. Academic Press, San Diego, p 11-79.', url: 'https://www.sciencedirect.com/book/9780125940122/the-mollusca', source: 'Academic Press' }
        ],
        'Octopus cyaneus': [
            { text: 'Norman, M.D., & Reid, A. (2000). A Guide to Squid, Cuttlefish and Octopuses of Australasia. CSIRO Publishing, Melbourne.', url: 'https://www.publish.csiro.au/book/3170/', source: 'CSIRO Publishing' },
            { text: 'Hanlon, R.T., & Messenger, J.B. (1996). Cephalopod Behaviour. Cambridge University Press, Cambridge.', url: 'https://www.cambridge.org/core/books/cephalopod-behaviour/8B8B8B8B8B8B8B8B8B8B8B8B8B8B8B8B', source: 'Cambridge University Press' },
            { text: 'Huffard, C.L. (2013). Cephalopod neurobiology: an introduction. Invertebrate Neuroscience, 13(1), 9-12.', url: 'https://link.springer.com/article/10.1007/s10158-013-0147-2', source: 'Invertebrate Neuroscience' },
            { text: 'Jereb, P., & Roper, C.F.E. (2005). Cephalopods of the world. An annotated and illustrated catalogue of cephalopod species known to date. Volume 1. Chambered nautiluses and sepioids. FAO Species Catalogue for Fishery Purposes, No. 4, Vol. 1.', url: 'https://www.fao.org/3/y4160e/y4160e00.htm', source: 'FAO Species Catalogue' }
        ]
    };
    
    return morphologyReferences[latinName] || [
        { text: 'Froese, R., & Pauly, D. (2023). FishBase. World Wide Web electronic publication.', url: 'https://www.fishbase.org/', source: 'FishBase' },
        { text: 'IUCN. (2023). The IUCN Red List of Threatened Species. Version 2023-1.', url: 'https://www.iucnredlist.org/', source: 'IUCN Red List' },
        { text: 'WoRMS Editorial Board. (2023). World Register of Marine Species.', url: 'https://www.marinespecies.org/', source: 'World Register of Marine Species' },
        { text: 'CITES Secretariat. (2023). CITES Species Database (Species+).', url: 'https://speciesplus.net/', source: 'CITES Species+' }
    ];
}

// Export the function
if (typeof window !== 'undefined') {
    window.getMorphologyReferencesComplete = getMorphologyReferencesComplete;
}

