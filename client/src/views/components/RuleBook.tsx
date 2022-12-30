import { 
    Popover, 
    PopoverTrigger, 
    IconButton, 
    PopoverContent, 
    PopoverCloseButton, 
    PopoverHeader, 
    PopoverBody,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Heading
} from "@chakra-ui/react"
import { InfoIcon } from '@chakra-ui/icons';

export default function RuleBook() {

    const Roles = () => {
        return (
            <Accordion defaultIndex={[0]} allowToggle>
                <AccordionItem>
                    <AccordionButton>
                        <AccordionIcon />
                        <Heading size="sm">Werewolf</Heading>
                    </AccordionButton>
                    <AccordionPanel>
                        The werewolf is in the werewolf team. <br />
                        Every night, all werewolves will wake up and decide to kill one person. <br />
                        It is possible for the werewolfs to kill one of their teammates, or simply not kill anyone at all. <br /> 
                        The werewolves can choose to sacrifice them during the day and skip the day. <br />
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                    <AccordionButton>
                        <AccordionIcon />
                        <Heading size="sm">Villager</Heading>
                    </AccordionButton>
                    <AccordionPanel>
                        The villager is in the villager team. <br />
                        They do not have any special abilities, but they can vote during the day. <br />
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                    <AccordionButton>
                        <AccordionIcon />
                        <Heading size="sm">Seer</Heading>
                    </AccordionButton>
                    <AccordionPanel>
                        The seer is in the villager team. <br />
                        The seer can see which team is one player on during each night(third parties will show as the bad team).
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                    <AccordionButton>
                        <AccordionIcon />
                        <Heading size="sm">Hunter</Heading>
                    </AccordionButton>
                    <AccordionPanel>
                        The hunter is in the villager team. <br />
                        The hunter can take someone with him when he dies. <br />
                        He cannot take someone with him if he was poisoned by the witch. <br />
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                    <AccordionButton>
                        <AccordionIcon />
                        <Heading size="sm">Witch</Heading>
                    </AccordionButton>
                    <AccordionPanel>
                        The witch is in the villager team. <br />
                        The witch has one cure and one poison. The witch will know who got killed by the werewolfs if she still have the cure, and she can choose to save that person with the cure. <br />
                        She can also use the poison to kill one person during the night. She can only use one potion at one night. <br />
                        She can only save herself in the first night. <br />
                        Poison is not affected by the guard. <br />
                        If the victim of the werewolves get saved by the guard and the guard also guarded the victim, the person will still die to the werewolves. <br />
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                    <AccordionButton>
                        <AccordionIcon />
                        <Heading size="sm">Guard</Heading>
                    </AccordionButton>
                    <AccordionPanel>
                        The guard is in the villager team. <br />
                        The guard can choose to guard one person during the night. If the person is killed by the werewolf, they will not die. <br />
                        The guard cannot guard the same person two nights in a row. <br />
                        If the guard is guarded by the witch, the guard will still die to the werewolves. <br />
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                    <AccordionButton>
                        <AccordionIcon />
                        <Heading size="sm">Idiot</Heading>
                    </AccordionButton>
                    <AccordionPanel>
                        The idiot is in the villager team. <br />
                        The idiot won't leave if he is voted out, but he will still count as dead and cannot vote. <br />
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
        )
    }

    return (
        <Popover>
            <PopoverTrigger>
                <IconButton aria-label='Search database' colorScheme='blue' size='sm' icon={<InfoIcon />} />
            </PopoverTrigger>
            <PopoverContent zIndex={4} width='600px' mr='20px'>
                <PopoverBody>
                    <PopoverCloseButton />
                    <Heading as='h4' size='md' textAlign='center' fontWeight='bold' mb='20px'>Rule Book</Heading>
                    <Accordion allowMultiple>
                        <AccordionItem>
                            <AccordionButton>
                                <AccordionIcon />
                                <span>How to Play</span>
                            </AccordionButton>
                            <AccordionPanel>
                                Werewolf is a 6-12 player game. Then, the players are given a role, and the players are divided into two major teams: the village, and the werewolves. <br />
                                The objective of the game is to eliminate the other team through voting and/or killing. <br />
                                IF YOU ARE DEAD, DO NOT INTERFERE WITH THE GAME! MUTE YOUR MIC! Even if you are the seer and you know who are the werewolves, you cannot give away this information. <br />
                            </AccordionPanel>
                        </AccordionItem>
                        <AccordionItem>
                            <AccordionButton>
                                <AccordionIcon />
                                <span>Game Progression</span>
                            </AccordionButton>
                            <AccordionPanel>
                                After everyone gets their role, the game starts at night. <br />
                                The werewolves will kill and the special villagers will use their abilities(check Roles section). <br />
                                Then, everyone will wake up and enter the day phase. <br />
                                During the first day, if the host turned on badge election, the game will enter the badge election phase. <br />
                                <Accordion allowMultiple>
                                    <AccordionItem>
                                        <AccordionButton>
                                            <AccordionIcon />
                                            <span>Badge Election</span>
                                        </AccordionButton>
                                        <AccordionPanel>
                                            The players will start a vote for the badge. The badge will be given to the player with the highest votes. <br />
                                            Any one who choose to contest the badge cannot vote, but they can decide to leave the competition half way, but they still cannot vote. <br />
                                            If there is a tie, another vote will begin and everyone that's not in the competition can vote(including the players who previously left the competition). <br />
                                            The badge is a powerful item. It gives the player with the badge extra 0.5 vote(1.5 votes in total). <br />
                                            That means that in case of a tie, the badge will win the vote. <br />
                                            The badge can also be transfered to another player when the current holder dies. Even when they died during the night. <br />
                                            The player can also choose to destroy the badge. This provides an extra way to communicate information for the seer(see Tips)<br />
                                        </AccordionPanel>
                                    </AccordionItem>
                                </Accordion>
                                During the day, players can talk to each other and choose to vote for one person. <br />
                                The player with the most votes will be exilled. If there is a tie, the tied players will talk again and another round of vote will begin between them.<br />
                                If there is still a tie, no one will be exilled. <br />
                                Then the game will enter the night phase, and repeating the process until the winning objective is reached by any team.
                            </AccordionPanel>
                        </AccordionItem>
                        <AccordionItem>
                            <AccordionButton>
                                <AccordionIcon />
                                <span>Objective</span>
                            </AccordionButton>
                            <AccordionPanel>
                                The villager team always has the same objective: kill everyone on the werewolf team as well as other third parties. <br />
                                For werewolves, there are two winning conditions that the host can choose when they create the lobby. <br />
                                The werewolves need to either: <br />
                                - kill everyone in the villager team(which essentially means they need to have a equal number of players as the villager team because villagers can no longer vote the werewolves out) <br />
                                - kill all plain villagers OR all special villagers
                                We recommend the kill-all setting for lower player number lobbies, and the kill-either for larger lobbies like 12 players. <br />
                                There are also some special roles that don't take side with either the villager team or the werewolf team. Their winning condition will be explained in the Roles section.
                            </AccordionPanel>
                        </AccordionItem>
                        <AccordionItem>
                            <AccordionButton>
                                <AccordionIcon />
                                <span>Roles</span>
                            </AccordionButton>
                            <AccordionPanel>
                                <Roles />
                            </AccordionPanel>
                        </AccordionItem>
                        <AccordionItem>
                            <AccordionButton>
                                <AccordionIcon />
                                <span>Tips</span>
                            </AccordionButton>
                            <AccordionPanel>
                                <p>Seer is an extremely powerful role. The werewolves should try to not let the real seer take the lead. They can pretend that they are the real seer since there is no actual way to confirm a seer's identity. </p>
                                <br />
                                <p>The seer can choose to announce their next player that they are going to check, and if he dies the next day, he can either hand over the badge if they have a good role, 
                                    and destroy the badge if they are bad. If they don't have the badge then they can't convey this information because they are muted after their death.</p>
                                <br />
                                <p>The werewolves should leave a few teammates out of the badge contest, so that they can vote for their teammate</p>
                                <br />
                                <p>Werewolves killing their own teammate can be a good strategy if they think that the witch is going to save them.</p>
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    )
}
