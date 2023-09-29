import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: {
          faq: {
            h1: 'What is UMA?',
            p2: 'UMA is a no copyright ❌© character based on toys made in Japan by <a href="https://twitter.com/SUNMINKIM" target="_blank" rel="nofollow">Sun-Min Kim</a> + <a href="https://twitter.com/davidzhorvath" target="_blank" rel="nofollow">David Horvath</a>.',
            p3: 'No copyright means you are free to reproduce, reuse, and repurpose UMA in your projects.',
            p4: 'UMA is licensed under CC0 and is in the public domain. Forever. For all.',

            h5: 'What does it mean to be licensed under CCO?',
            p6: 'CC0 is the "no copyright reserved" option in the Creative Commons toolkit. <br/>It effectively means relinquishing all copyright and similar rights to a work and dedicating those rights to the public domain.',
            p7: 'Again this means, Forever. For all.',

            h8: 'What is a DAO?',
            p9: 'A decentralized autonomous organization (DAO) is a system developed to distribute decision-making, management, and entity ownership.',
            p10: 'Instead of relying on a single individual or small collection of individuals to guide the entity\'s direction, a DAO intends to give every member a voice, vote, and opportunity to propose initiatives.',
            p11: 'In the UMA DAO, this is done through the UMA House on the Prop House infrastructure.',

            h12: 'What is the UMA DAO / UMA House?',
            p13: 'The UMA decentralized autonomous organization (DAO) exists to expand the UMA universe.',
            p14: 'The UMA house was created by <a href="https://twitter.com/matascup" target="_blank" rel="nofollow">Matas</a> to help the expansion, by incentivizing builders & creators to work on and with UMA.',
            p15: 'Rounds are run on a weekly basis & all winning proposals get rewarded with a UMA NFT each, which doubles as a vote for all future rounds.',
          
            h16: 'How Do I Mint a UMA? I can\'t mint! <br />How can I be put on the Allowlist?',
            p17: 'Rounds are held weekly at UMA House, which is your opportunity to submit a proposal. Proposals are your opportunity to pitch your vision of how you would expand the UMA-verse.',
            p18: 'At the end of a round holders of a UMA NFT are able to vote on the top 5 proposals. Those top 5 proposals are then able to mint their UMA NFT which allows them to then vote in future rounds of the UMA House.',
            p19: 'This is how the UMA-verse expands and evolves over time through the creativity of the contributors proposals.',

            h20: 'How are winning proposals selected?',
            p21: 'Current holders vote on their favorite proposals each week. One UMA being equal to one vote.',
            p22: 'In case of ties, the tied proposals submitted earliest get priority. So the top 5 proposals as they show up on Prop House after a completed round, win. <br />1 UMA = 1 vote.',
            p23: 'Resubmit your proposal if you don\'t make it in a given round. <br />Resubmitting is easy and encouraged.',

            h24: 'What\'s the best way to get involved?',
            p25: 'Join the <a href="https://discord.com/invite/ryZsjTaryF" className="text-primary" target="_blank" rel="nofollow">UMA discord</a>, and say hi! Propose a contribution through the <a href="https://prop.house/uma" target="_blank" rel="nofollow">UMA Prop House</a>! Or direct message <a href="https://twitter.com/matascup" target="_blank" rel="nofollow">@Matas</a>, <a href="https://twitter.com/razorsuns" target="_blank" rel="nofollow">@razorsuns</a>, or other UMA DAO members on Twitter, they will be more than happy to help you get involved.',

            h26: 'How many UMAs will there be?',
            p27: 'Hopefully a lot. UMAs are meant to be inflationary, where the potential value lost to inflation will be more than made up for by the new contributions added to the ecosystem.',
            p28: '<a href=\"https://twitter.com/matascup\" target=\"_blank\" rel=\"nofollow\">Matas</a> will be reserving 10% of the supply.',

          }
        }
      },
      es: {
        translation: {
          faq: {
            h1: '¿Qué es un UMA?',
            p2: 'UMA es un personaje sin copyright ❌© <br/>basado en los juguetes fabricados en Japón por <a href="https://twitter.com/SUNMINKIM" target="_blank" rel="nofollow">Sun-Min Kim</a> y <a href="https://twitter.com/davidzhorvath" target="_blank" rel="nofollow">David Horvath.</a>',
            p3: 'Sin derechos de autor significa que eres libre de reproducir, reusar y reconvertir un UMA en tus proyectos.',
            p4: 'UMA está bajo licencia CC0 y es de dominio público. Para siempre. Para todos.',

            h5: '¿Qué significa estar bajo licencia CC0?',
            p6: 'CC0 es la opción "sin derechos reservados" del conjunto de herramientas de Creative Commons. Significa efectivamente renunciar a todos los derechos de autor y similares sobre una obra y dedicar esos derechos al dominio público.',
            p7: 'De nuevo, esto significa "para siempre". Para todos.',

            h8: '¿Qué es una DAO? ',
            p9: 'Una Organización Autónoma Descentralizada (DAO en inglés para Decentralized Autonomous Organization) es un sistema desarrollado para distribuir la toma de decisiones, la gestión y la propiedad de las instituciones.',
            p10: 'En lugar de confiar en un único individuo o en un pequeño grupo de individuos para guiar la dirección de la entidad, una DAO pretende dar a cada miembro voz, voto y la oportunidad de proponer iniciativas.',
            p11: 'En la UMA DAO, esto se hace a través de la UMA House (Casa de Propuestas UMA) dentro de la infraestructura de Prop House.',

            h12: '¿Qué es la UMA DAO / UMA House? ',
            p13: 'La Organización Autónoma Descentralizada (DAO) de UMA existe para expandir el universo UMA.',
            p14: 'La Casa de Propuestas UMA fue creada por Matas para ayudar a la expansión, incentivando a los constructores y creadores a trabajar en y con UMA.',
            p15: 'Las rondas se realizan semanalmente y todas las propuestas ganadoras son recompensadas con un UMA NFT cada una, que se convierten, además, en un voto para todas las rondas futuras.',

            h16: '¿Cómo puedo hacer el mint de un UMA? <br/>No puedo hacer el mint, ¿cómo me inscribo en una lista de espera?',
            p17: 'Las rondas se celebran semanalmente en la  Casa de Propuestas UMA, que es el tiempo donde se presentan propuestas. Las propuestas son tus ideas y visión de cómo ampliarías el UMA-verso.',
            p18: 'Al final de una ronda, los titulares de UMAs pueden votar las 5 mejores propuestas. Las 5 mejores propuestas podrán entonces hacer el mint (acuñar) su NFT de UMA, lo que les permitirá votar en futuras rondas de la  Casa de Propuestas.',
            p19: 'Así es como el UMA-verso se expande y evoluciona con el tiempo a través de la creatividad de las propuestas de los contribuyentes.',

            h20: '¿Cómo se seleccionan las propuestas ganadoras?',
            p21: 'Los titulares actuales votan sus propuestas favoritas cada semana. Un UMA equivale a un voto.',
            p22: 'En caso de empate, tienen prioridad las propuestas presentadas antes. Por lo tanto, ganan las 5 primeras propuestas que aparecen en Prop House después de una ronda completa.<br/>1 UMA = 1 voto.',
            p23: 'Si no lo consigues en una ronda determinada, vuelve a presentar tu propuesta.<br />Volver a presentarla es fácil y es lo recomendable.',

            h24: '¿Cuál es la mejor manera de participar?',
            p25: 'Únete al <a href=\"https://discord.com/invite/ryZsjTaryF\" className=\"text-primary\" target=\"_blank\" rel=\"nofollow\">Discord de UMA</a> y saluda. Contribuye con propuestas a través de la Casa de Propuestas de UMA. O envía un mensaje directo a <a href=\"https://twitter.com/matascup\" target=\"_blank\" rel=\"nofollow\">@Matas</a>, <a href=\"https://twitter.com/franklinvargas\" target=\"_blank\" rel=\"nofollow\">@franklinvargas</a> u otros miembros de la UMA DAO en Twitter, estarán encantados de ayudarte a participar.',
            h26: '¿Cuántas UMA habrá?',
            p27: 'Esperamos que muchas. Los UMAs están pensadas para ser inflacionarias, donde el valor potencial perdido por la inflación será más que compensado por las nuevas contribuciones añadidas al ecosistema.',
            p28: '<a href=\"https://twitter.com/matascup\" target=\"_blank\" rel=\"nofollow\">Matas</a> se reserva el 10% del suministro total.',

          }
        }
      },
      fr: {
        translation: {
          faq: {
            h1: 'UMA, c\'est quoi?',
            p2: "UMA est un personnage sans droits d'auteur ❌©<br/>basé sur des jouets fabriqués au Japon par <a href=\"https://twitter.com/SUNMINKIM\" target=\"_blank\" rel=\"nofollow\">Sun-Min Kim</a> + <a href=\"https://twitter.com/davidzhorvath\" target=\"_blank\" rel=\"nofollow\">David Horvath</a>.",
            p3: "Pas de droits d'auteur signifie que vous êtes libre de reproduire, réutiliser et réinterpréter UMA dans vos projets.",
            p4: "UMA est sous licence CC0 et est dans le domaine public. Pour toujours. Pour tous.",
          
            h5: "Que signifie être sous licence CC0?",
            p6: "CC0 est l'option \"pas de droits d'auteur réservés\" dans la boîte à outils Creative Commons. <br/>Cela signifie l'abandon de tous les droits d'auteur et similaires sur une œuvre et la dédication de ces droits au domaine public.",
            p7: "Encore une fois, cela signifie, pour toujours. Pour tous.",
          
            h8: "Qu'est-ce qu'une DAO?",
            p9: "Une organisation autonome décentralisée (DAO) est un système développé pour distribuer la prise de décision, la gestion et la propriété de l'entité.",
            p10: "Au lieu de s'appuyer sur un individu ou un groupe d'individus pour orienter la direction de l'entité, une DAO donne à chaque membre une voix, un vote et la possibilité de proposer des initiatives.",
            p11: "Pour UMA DAO, cela se fait via la UMA House sur l'infrastructure publique Prop House.",
          
            h12: "Qu'est-ce que UMA DAO/UMA House?",
            p13: "L'organisation autonome décentralisée (DAO) UMA existe pour étendre l'univers UMA.",
            p14: "La UMA House a été créée par <a href=\"https://twitter.com/matascup\" target=\"_blank\" rel=\"nofollow\">Matas</a> pour aider à l'expansion, en incitant constructeurs et créateurs à travailler sur et avec UMA.",
            p15: "Des tours sont organisés chaque semaine et toutes les propositions gagnantes sont récompensées par une NFT UMA qui sert de vote pour tous les prochains tours.",
          
            h16: "Comment puis-je minter un UMA? Je ne peux pas minter! <br /> Comment puis-je être ajouté à la liste d'attente?",
            p17: "Des tours ont lieu chaque semaine à la UMA House, c'est votre opportunité pour soumettre une proposition. Les propositions sont votre chance de présenter votre vision de la manière dont vous étendriez l'univers UMA.",
            p18: "À la fin d'un tour, les membres de la DAO peuvent voter pour les 5 meilleures propositions. Ces 5 meilleures propositions peuvent ensuite minter leur NFT UMA, ce qui leur permet ensuite de voter lors des prochains tours de la UMA House.",
            p19: "C'est ainsi que l'univers UMA s'étend et évolue au fil du temps grâce à la créativité des propositions des contributeurs.",
          
            h20: "Comment sont sélectionnées les propositions gagnantes?",
            p21: "Les détenteurs actuels votent pour leurs propositions préférées chaque semaine.<br />Un UMA équivaut à un vote.",
            p22: "En cas d'égalité, les propositions égalisées soumises plus tôt ont la priorité. Ainsi, les 5 meilleures propositions telles qu'elles apparaissent sur Prop House après un tour terminé remportent la victoire. <br /> 1 UMA = 1 vote.",
            p23: "Représentez votre proposition si vous ne réussissez pas dans un tour donné. <br /> Reproposer est facile et encouragé.",
          
            h24: "Quel est le meilleur moyen de s'impliquer?",
            p25: "Rejoignez le <a href=\"https://discord.com/invite/ryZsjTaryF\" className=\"text-primary\" target=\"_blank\" rel=\"nofollow\">Discord UMA</a> et dites bonjour! Proposez une contribution via <a href=\"https://prop.house/uma\" target=\"_blank\" rel=\"nofollow\">UMA Prop House</a>! Ou envoyez un message direct à <a href=\"https://twitter.com/matascup\" target=\"_blank\" rel=\"nofollow\">@Matas</a>, <a href=\"https://twitter.com/0x572f00\" target=\"_blank\" rel=\"nofollow\">@0x572f00</a> ou à d'autres membres d'UMA DAO sur Twitter, ils seront plus qu'heureux de vous aider à vous impliquer.",
          
            h26: "Combien y aura-t-il d'UMAs?",
            p27: "Espérons beaucoup! Les UMAs sont censés être inflationnistes, où la valeur potentielle perdue à cause de l'inflation sera plus que compensée par les nouvelles contributions ajoutées à l'écosystème.",
            p28: "<a href=\"https://twitter.com/matascup\" target=\"_blank\" rel=\"nofollow\">Matas</a> se réservera 10% du stock."

          }
        }
      }
    }
  });

export default i18n;