export let fangDate = {
    eventName: 'A Date with Fang',
    interactions: [
        {
            active: true, name: 'Introduce Yourself', clear: true, baseCooldown: 100, resourceUse: 'Attraction', resourceProvide: 'Attraction', provideAmount: 1,
            snippets: {
                0: [`“I’m $name, by the way.” You introduce yourself. “It’s nice to meet you.”<br/><br/>Fang laughs and pats you on the back with one of his huge hands hard enough you almost stumble. “$name, eh? Cute. And I bet it is nice to meet me, isn’t it? I would say it’s nice to have run into you but I think we both know that’s not how it happened.” Fang teased good-naturedly.<br/><br/>Again you felt yourself blushing at the wolf’s extreme confidence bordering on arrogance. But, unlike other people you had seen and met that thought way too much of themselves you didn’t detect any maliciousness or demeaning sense of superiority in his words. Fang clearly thought the world of himself but he didn’t seem to look down on you in the process. In a way it felt strangely… comforting. Despite how arrogant and self-assured Fang sounded you just couldn’t imagine him actually bullying someone and tearing them down.`],
                3: [`“Oh, uh. Sorry. I forgot to introduce myself.” You explained with a mixture of embarrassment and shame. You’d been so distracted with all of, well, Fang that you hadn’t even told him your name. “I’m $name. Its uh… its great to meet you.”<br/><br/>The wolf chuckled in good humor before giving you a friendly slap on the back. Unfortunately for someone his size a friendly slap nearly sent you stumbling forward! Luckily you caught yourself before you fell down again. When you looked back towards the wolf he was just grinning back down at you with that almost constant cocky demeanor of his. Fang was obviously full of himself. Not that you could necessarily blame him when he had a body like that. The weird thing was that no matter how much the wolf talked himself up or bragged you didn’t get any feeling of maliciousness or sense that he thought less of you for not being him.<br/><br/>He clearly had no reluctance to compare himself to you but when he did so you started to realize he never actually did so in a way that was putting you down. He’d take any opportunity to say how much bigger his arms or chest were compared to yours but never actually implied you were small or inferior. Just that he was bigger. Somehow, despite having a body that seemed built for it, you couldn’t quite bring yourself to imagine Fang actually bullying someone and tearing them down.`]
            },
            leadsTo: [`Admire`, `Praise`, `Flirt`]
        },
        { active: true, name: 'Shake Hands', singleClear: true, baseCooldown: 100, resourceProvide: 'Attraction', provideAmount: 3, snippets: [`Reaching out you shake the wolf's hand.`] },
        { active: false, name: 'Admire', clear: true, baseCooldown: 100, leadsTo: [`Look Fang Over`, `Compare to Yourself`, 'Flirtatious Touching', `Back`] },
        {
            active: false, name: 'Look Fang Over', baseCooldown: 100, resourceUse: 'Attraction', resourceProvide: 'Attraction', provideAmount: 1, poolSnippets: true,
            snippets: {
                0: [`You’re can’t stop from gawking momnentarily at how thick the tree trunks Fang calls legs are.`, `You admire Fang’s big, sleeve-straining biceps`],
                6: [`You catch yourself staring at the wolf’s thick ass visibly stretching out the seat of his jeans.`],
                8: [`There’s no denying whatsoever that the wolf is packing beyond belief. With how obscenely outlined Fang’s junk was it was unlikely he could have hidden it even if he wanted to.`]
            }
        },
        {
            active: false, name: 'Compare to Yourself', baseCooldown: 100, resourceUse: 'Attraction', resourceProvide: 'Attraction', provideAmount: 1, poolSnippets: true,
            snippets: {
                0: [`You can’t help but be a bit intimidated by Fang’s height. You’re not short but your head still doesn’t even come up to the base of his neck.`, `There was no contest that the wolf was bigger than you. Even if you were the same height as him he’d still drastically outweigh you in pure muscle and could still probably snap you like a toothpick.`],
                4: [`Subtly you shift your stance to extend one of your feet closer to Fang’s. You shudder when you realize the wolf’s massive open-toed shoes are almost twice the size of your own and still barely fit his feet.`]
            }
        },
        {
            active: false, name: 'Flirtatious Touching', baseCooldown: 100, baseCounter: 6, resourceUse: 'Attraction', resourceProvide: 'Attraction', provideAmount: 1, poolSnippets: true,
            snippets: {
                0: [`Moving closer you smile up at the looming wolf as you rest a hand on the small of his back; slowly rubbing your hand in small circles much to his amused approval.`, `You gently lay your hand on top of Fang’s where it’s resting on his hip, brushing your fingers against the space between his as if to insinuate the two of you interlock your fingers.`],
                8: [`Risking being a bit forward you move in closer to the wolf’s side and casually rest a hand on one of his asscheeks to give it a slow, firm squeeze.`]
            }
        },
        { active: false, name: 'Praise', clear: true, baseCooldown: 100, leadsTo: [`Compliment Height`,`Compliment Musculature`,`Compliment Body`,`Back`] },
        {
            active: false, name: 'Compliment Height', baseCooldown: 100, resourceProvide: 'Attraction', provideAmount: 1,
            snippets: [
                `You offhandedly mention to Fang that it must be hard getting around campus considering he must have to duck under most doorways. His reply is to grin smugly and brag “Yea, but it sure does make a statement anytime I enter a room, does it?”`,
                `You subtly move a bit closer to better compare your height to the wolf. Only coming up to the middle of the wolf’s chest you only realize you’ve been spacing out, staring, for several seconds when Fang clears his throat to catch your attention.<br/><br/>“You ok down there? Yea? Ok good. Just wanted to make sure. Sometimes it’s hard to tell from this altitude.” The thin attempt he made to hide a smirk evaporates at his last statement.`,
                `“Where do you even buy clothes that big?” The question escapes your mouth before you catch yourself.<br/><br/>Fang isn’t doesn’t seem put out. Instead he chuckles before answering. “There’s a specialty shop in the mall that caters to larger than normal people.” Then his lips pull back in a wicked grin and his next words drip with cocky smugness. “Though even then they still have to custom tailor some stuff to fit me.”`
            ]
        },
        {
            active: false, name: 'Compliment Musculature', baseCooldown: 100, resourceProvide: 'Attraction', provideAmount: 1,
            snippets: [
                `After being unable to help but stare when the wolf takes a deep breath and his shirt visibly strains around his chest you hear yourself speak aloud without intending to.<br/><br/>“God your pecs are massive.”<br/><br/>Clearly not put out at all Fang puffs his chest out intentionally this time and even makes them bounce a bit by flexing one then the other while growling almost hungrily.<br/><br/>“Well they have to be, otherwise they wouldn’t match the rest of me.”`,
                `“How do you even get arms that big?” You ask. “Those things are huge! You’ve probably got more muscle in one arm than my whole body.<br/><br/>Fang pulls his lips back in an intimidatingly fang-filled, feral grin while clearly trying to make himself look as monstrous and wild as possible. Then he leans down so hes face to face with you and rumbles in the deepest, most monster-like voice he can mange<br/><br/>“I eat other buff guys.”<br/><br/>He’s only able to hold the menacing aura for another second before it cracks and rolls of deep laughter boom from him.<br/><br/>“Just kidding. It’s genetics.”`,
                `“You know, I’ve seen fully grown tree trunks that weren’t as thick around as your thighs.” You praise.<br/><br/>Clearly soaking up the attention and compliment Fang squats down slightly to cause his thighs to flare and visibly strain the seams of his pants with their expanded girth.<br/><br/>“You ever seen those videos of people crushing watermelons between their thighs? You should see what I can crush with with these things.”`
            ]
        },
        {
            active: false, name: 'Compliment Body', baseCooldown: 100, resourceProvide: 'Attraction', provideAmount: 1,
            snippets: [
                `Trying not to obsess over the sheer size of the wolf you mention how sof and smooth his fur looks. He invites you to take a feel and holds an arm out for you to brush your fingers over the surprisingly pleasant feeling black fur along his forearm.<br/><br/>“Its the only part of me that’s soft. Or at least, the only part that is ALWAYS soft.” Fang teases with a wink.`,
                `Despite everything else being so attention-grabbing about the monster of a wolf It’s surprising how much his bright blue eyes stand out in contrast to his jet black fur. When you mention that the wolf actually pauses for a moment to look down at you. Then his lips spread into an, if still cocky, much softer smile than before and he thanks you appreciatively without further self-aggrandizement. At least, for the moment.`,
                `“Ok I’m just going to say it.” You blurt out. “You’re really big. God-damned huge. Like, probably the biggest guy I’ve ever seen. Like. Not just tall, though you’re damn sure the tallest person I’ve ever met but you’re RIPPED bigger than some bodybuilders! Just… huge.”<br/><br/>Each addition just makes the wolf’s seemingly-permanent grin wider and water as he drinks up each praising word. His tail actually twitches back and forth slightly in what looks dangerously close to it trying to wag the longer you go on talking up how big he is. He clearly has an ego and clearly enjoys having it stroked.<br/><br/>After savoring the praise for a few moments he licks his lips and raises both arms up in a double bicep flex for you. “Damn right. Biggest beast you’re ever gonna meet.”`
            ]
        },
        { active: false, name: 'Flirt', clear: true, baseCooldown: 100, leadsTo: [`Ask Fang to Flex`,`Ask What He's Up To`,`Make Inuendo`,`Back`] },
        {
            active: false, name: 'Ask Fang to Flex', baseCooldown: 100, resourceUse: 'Attraction', resourceProvide: 'Attraction', provideAmount: 1, poolSnippets: true,
            snippets: {
                0: [
                    `You ask Fang to flex an arm for you so he grins and strikes a bicep pose, nearly tearing his shirt sleeve in the process.`, 
                    `You tell fang how huge his pecs look so he puffs his chest out to make them stretch out his shirt enough the hem rides up and exposes a hint of his midriff. `
                ],
                6: [`Blushing, you ask Fang if he likes showing off his muscles. Instead of answering he hunches forward and curls his arms in for a most muscular pose; threatening to shred the seams of his clothes from top to bottom!`]
            }
        },
        {
            active: false, name: `Ask What He's Up To`, baseCooldown: 100, resourceProvide: 'Attraction', provideAmount: 1,
            snippets: [
                `You ask him if he’s up to much today. The wolf gives you a casual shrug.<br/><br/>“You know, the usual. Was probably gonna go hang out at the gym for a bit and see if any of the guys are around. Then get something to eat and probably just head home and veg out tonight. Only had morning classes and no practice today so gonna just, y’know. Do whatever.” <br/><br/>Then the wolf smirks knowingly.<br/><br/>“Why, you wanting to hang out even though we just met?”<br/><br/>When he sees the look of discomfort that comes over you Fang lets out a boom of laughter and slaps your back hard enough to make you stumble.<br/><br/>“Calm down. I’m just messin with ya. You’re kinda cute when you’re flustered.”`,
                `Trying to be subtle you ask Fang if he has any plans this weekend.<br/><br/>“Well me and some of the guys were gonna hang out on Sunday and probably roam the mall or something. I needed to stop by one of the stores there anyway and get a couple shirts fixed.” He pauses for a moment before shooting you a toothy grin. “Damn sleeves just keep blowing out, you know?”<br/><br/>As he says this he makes a show of flexing one of his biceps. The thick ball of muscle bulges obscenely and visibly strains the sleeve struggling to contain it.<br/><br/>“You wanna come? I can’t promise I’ll be doing much other clothes shopping for you to give me opinions on if you were wanting to see me getting dressed and undressed for you. But you never know…”<br/><br/>The flush that heats your face must have been visible because the wolf snickered and lowered his arm.<br/><br/>“You’re too easy.”`,
            ]
        },
        {
            active: false, name: `Make Inuendo`, baseCooldown: 100, queueMax: 0, resourceProvide: 'Attraction', provideAmount: 1,
            snippets: [
                `You make an inuendo, roll a wisdom saving throw`
            ]
        },
        { active: false, name: 'Back', clear: true, baseCooldown: 100, leadsTo: [`Admire`, `Praise`, `Flirt`] },
        {
            active: false, name: `Go back to Fang's Place`, clear: true, classes: 'green', baseCounter: 10, baseCooldown: 100, resourceUse: 'Attraction',
            snippets: [`Unable to resist your cascading attraction to Fang you ask him if he wants to hang out together for a while. Fang grins and agrees before leading you back to his place.`],
            leadsTo: [`Arrive at Fang's Place`]
        },
        {
            active: false, name: `Arrive at Fang's Place`, clear: true, baseCooldown: 100, provideAmount: 1,
            snippets: [`You both enter Fang’s house and close the door behind you. Moments later it dawns on you that you’re now alone with Fang in an enclosed, private space and your cheeks start heating in embarrassment… and excitement.`],
            leadsTo: [`Ask Fang to Show Off`, `Explore Fang's Body`, `Undo Fang's Pants`, `Ask Fang to Flex Again`, `Show of Affection`, `Make Out`, `Take off Fang's Shirt`, `Slip off Fang's Shoes`]
        },
        {
            active: false, name: `Undo Fang's Pants`, baseCooldown: 100, singleClear: true, resourceUse: 'Arouse', resourceProvide: 'Arouse', provideAmount: 1,
            snippets: [
                `After working up your courage for a few moments you ask Fang if you can take off his pants. He wordlessly nods, standing there until you kneel down in front of him to fumble the button and zipper of his pants open. Just as the zipper comes open he rolls his hips forward to ensure his bulge momentarily smothers your entire face.`
            ]
        },
        {
            active: false, name: `Take off Fang's Shirt`, baseCooldown: 100, singleClear: true, resourceUse: 'Arouse', resourceProvide: 'Arouse', provideAmount: 1,
            snippets: [
                `You ask if Fang could take off his shirt. He says no, then adds that you can if you want though. He lets you struggle to take off his shirt, making sure to grind his crotch against you the whole time.`
            ],
        },
        {
            active: false, name: `Slip off Fang's Shoes`, baseCooldown: 100, singleClear: true, resourceUse: 'Arouse', resourceProvide: 'Arouse', provideAmount: 1, poolSnippets: true,
            snippets: {
                0: [`You offer to help Fang take off his shoes. He grins and plops down on the couch to let you do so. It takes some effort to unlace the massive boots and takes two arms to manage to pull each one off and set them aside.`],
                6: [`You offer to help fang take off his shoes. He licks his lips and plops on the couch to let you. He pushes his feet against you each time you get one of his shoes off and tells you to ‘kiss it’ both times; waiting for you to do so before putting his feet back down.`]
            }
        },
        {
            active: false, name: `Ask Fang to Show Off`, baseCooldown: 100, resourceUse: 'Arouse', resourceProvide: 'Arouse', provideAmount: 1, poolSnippets: true,
            snippets: {
                0: [`You encourage fang to show off so he grins and casually reaches up to press a hand flat against the 9 foot ceiling without even fully extending his arm.`, `Fang convinces you to try hitting his stomach to show off how hard his abs are, but not to hit too hard. You find his abs hard as a brick wall and glad he told you not to swing too hard or you’d have broken your hand.`, `You compliment Fang’s deep voice so he moves right up to you and growls deep and loud enough to rattle picture frames with his growled Thank You.`],
                3: [`Fang wants to show you something. When you agree he grabs the back of your shirt and effortlessly lifts you off the ground, leaving your feet dangling off the floor with no visible effort on his part before putting you back down.`],
                6: [`Fang tells you “hey, watch this.” Then strikes a bicep pose then exerting only a minor bit of extra effort before the sleeve split apart all the way up to the shoulder. He then repeats this with the other arm and finishes by giving his now exposed bicep a kiss.`]
            }
        },
        { active: false, name: `Explore Fang's Body`, baseCooldown: 100, resourceUse: 'Arouse', resourceProvide: 'Arouse', provideAmount: 1, snippets: { 0: [''], 8: [''] } },
        { active: false, name: `Ask Fang to Flex Again`, baseCooldown: 100, resourceUse: 'Arouse', resourceProvide: 'Arouse', provideAmount: 1, snippets: { 0: [''], 8: [''] } },
        {
            active: false, name: `Show of Affection`, baseCooldown: 100, resourceUse: 'Arouse', resourceProvide: 'Arouse', provideAmount: 1,
            snippets: {
                0: [`You wrap your arms around Fang’s upper stomach, noting you can’t reach all the way around him in the process, and hug yourself against him. Fang rests a hand on your head then slides it down to your back to cradle you against him while you bask in his bodyheat and breath in his scent.`, `Sitting yourself on the couch to give yourself a moment, you’re almost immediately joined by Fang sitting next to you. He drapes an arm over you to pull you in close, letting you rest your head against the side of his chest. You rub your cheek against it like trying to get comfy on a pillow then soon find yourself nuzzling against the firm muscle affectionately while Fang does the same to the top of your head while whispering teasing things to you.`, `Asking if Fang wants to relax for a little bit the wolf moves quickly to the couch, grabbing you along the way, and roughly plops himself down on the cushions while pulling you into his lap. His massive arms wrap around you and lightly but irresistibly hold you in his lap against his chest while he leans down and nuzzles into one side of your neck, soon alternating between nibbling and kissing your sensitive neck.`],
                3: [`“Hey, c’mere” Fang calls before pulling you in close to him. He holds you against him for a moment, just basking in the closeness before making a show of having to crouch down so he can be face to face with you and give you a quick, playful peck of a kiss to the front of your lips. Then a second later pressing his lips more fully into yours for a longer, fuller lip to lip kiss.`]
            }
        },
        {
            active: false, name: `Make Out`, baseCooldown: 100, resourceUse: 'Arouse', resourceProvide: 'Arouse', provideAmount: 1,
            snippets: {
                0: [`Fang flippantly asks if you wanna make out for a bit. Upon agreeing he sits down in a recliner chair and pulls you onto his lap, letting you lean against him for support as he cups the back of your head and pulls you in to lock lips with you for a couple minutes of laid back kissing.`, `You hesitantly ask him if he wanted to make out a bit. Rather than agree he grabs your ass with one huge hand and lifts you up off the ground and pulls you against him. His other hand gently but firmly grabs the back of your head and pushes your lips in against his while he cradles you against him with your feet dangling off the ground.`],
                6: [`After laying back on the couch Fang reaches out to grab one of your arms. With a playful growl he pulls you ontop of him then pulls your head in for a long, deep kiss; letting your tongue intermingle with his in a light tongue wrestling match. Just before finishing the kiss his tongue abruptly shoves your back, easily overpowering you and all-but filling your mouth momentarily with the sheer size of his tongue before pulling back just as quickly and giving you a smug grin.`],
                8: [`Fang braces a broad hand against your chest then shoves you backwards until you fall on your back atop the couch. Moments later he’s crawled atop you on all fours looming overhead. After only a second of a lustful, hungry grin he smothers you from the neck down under his enormous weight while mashing his lips against yours. Aggressively he pushes his tongue into your mouth to the point you’re nearly choking on it at a few points until he’s satisfied he’s thoroughly asserted oral dominance over you.`]
            }
        },
        { active: false, name: 'Sniff Kobold', baseCooldown: 100, snippets: [`You lean in close and take a slow draw of the kobold's scent. It smells vaguely like clay and something sweet you can't place.`, `You raise your hand and let your nose bump the kobold and take in it's earthy and strangely sweet scent.`, `You lean in and pin the kobold to your palm under your nose and suck in the unexpectedly enticing aroma reminiscent of unfired pottery and a nondescript sugary treat.`] },
        { active: false, name: 'Lick Kobold', baseCooldown: 100, snippets: [`You drag your tongue up the length of the kobold's body, nearly lifting it off it's feet as its alluring, tangy sweetness tickles your taste buds.`, `Your tongue pushes the kobold down on their back and leaves them soaked in saliva after it sweeps across them. The taste leaves your mouth watering.`, `Moving in closer, the smell becomes too enticing and you can't help but sneak a taste. a quick swipe of your tongue against their chest sends the kobold stumbling back and leaves a delectably sugary taste lingering on your tongue.`] },
        { active: false, name: 'Put Kobold In Mouth', clear: true, baseCooldown: 100, snippets: [`Spreading your lips wide you casually flick your wrist and toss the kobold inside.`, `Rolling the kobold back into your fingers you wrap your lips around the kobold and fingers both, slowly dragging the fingers from your lips and leaving the kobold trapped inside.`], leadsTo: ['Let out of Mouth', 'Roll around Mouth', 'Suckle On', 'Swallow'], passive: 'Mouth Passive' },
        { active: false, name: 'Let out of Mouth', clear: true, baseCooldown: 100, snippets: [`Reluctantly, you open your mouth and let the saliva-drenched kobold slide out onto your waiting palm`, `Pursing your lips, you puff out your cheeks briefly and use the pressure to spit the kobold out into your hand.`], leadsTo: ['Sniff Kobold', 'Lick Kobold', 'Put Kobold In Mouth'], passive: 'Grab Passive' },
        { active: false, name: 'Roll around Mouth', baseCooldown: 100, progressInteractions: ['Swallow'], snippets: [`You slosh the kobold back and forth across your tongue.`, `You Roll the kobold around your mouth, thoroughly soaking them in your saliva.`, `You curl your tongue, letting the kobold slide back towards the entrance to your throat then tilt forward just in time to stop them from falling inside.`] },
        { active: false, name: 'Suckle On', baseCooldown: 100, progressInteractions: ['Swallow'], resourceUse: 'Orgasm', resourceProvide: 'Orgasm', provideAmount: 1, snippets: { 0: [`Your tongue pushes the kobold against your palette as you suck on them till most of the saliva is pulled free.`, `You pin them against the inside of one of your cheeks and casually suckle on them like a hard candy.`, `You draw in your breath with your lips sealed, tongue holding the kobold against your teeth to build pressure, sucking the flavor off of their saliva-soaked fur.`], 5: [`You can feel the little kobolds excitement as you suckle them, they are getting into it!`, `As you suckle the kobold is gripping just a bit tighter to your tounge.`], 7: [`As you swirl them around you hear some moaning coming from within your maw.`, `The little kobold is lost in bliss from being suckled, you can taste their jucies as you suckle them.`] } },
        { active: false, name: 'Swallow', baseCooldown: 100, baseCounter: 3, clear: true, classes: 'red', final: true, snippets: ['Tilting your head back, you let the kobold slide back to the entrance to your throat before swallowing them down.', `Without warning you curl your tongue to shove them to the back of your mouth and, without ceremony, gulp them down`] },
    ],
    passives: [
        { name: 'Grab Passive', snippets: ['The kobold looks around nervously as you hold them', 'Occasionally the kobold squirms in your grasp, careful not to accidentally slide from your grip and fall.', 'The kobold glances up at you, as much inspecting you as you inspect them, before their attention wanders to something else around them'] },
        { name: 'Mouth Passive', snippets: ['You can feel their tiny hands clawing at your tongue trying to find purchase', `The kobold's unnaturally sweet taste fills your mouth and causes you to salivate more than usual`, `Tiny arms and legs wrap around your tongue and squeeze weakly. you can't tell if they're trying to hold onto it to avoid being swallowed or hugging it out of affection.`] }
    ],
    resources: [
        { name: 'Attraction', maxAmount: 10 },
        { name: 'Arouse', maxAmount: 10 },
        { name: 'Orgasm', maxAmount: 10 }
    ],
    startingDesc: ['The wolf stands infront of you.']
}