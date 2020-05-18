---
waltz:
  title: Camo Caper
meta:
  version: 0.0.2
  gdd authors:
    - Matt Miller
    - Zihan Wu
  template authors:
    - Austin Cory Bart <acbart@udel.edu>
    - Mark Sheriff
    - Alec Markarian
    - Benjamin Stanley
---


# Overview

## Elevator Pitch

*Camo Caper is a top-down stealth game designed to teach color mixing and color theory. Play as the famous cat thief with a magical color changing cape on a heist for the newest collection of priceless gems. Maneuver through maps, while blending in with the background to avoid getting spotted! Stay hidden, stay sneaky. If you are visible for too long, the guards will catch you!*

## Influences (Brief)

- *Influence #1*:
  - Medium: *Fantasy settings, Harry Potter*
  - Explanation: *Just the idea of an invisibility cloak and how that lends to blending into the background*
- *Influence #2*:
  - Medium: *Maze games and adventure games*
  - Explanation: *Influenced by having a character navigate a world and have to do certain things to unlock / avoiding certain areas to get to a goal.*
- *Influence #3*:
  - Medium: *Phantom thieves, Persona 5*
  - Explanation: *Just the aesthetics and idea of a fantastical phantom thiefs.*

## Core Gameplay Mechanics (Brief)

- *Use arrow keys to move*
- *Use 1,2,3,4, and space to mix colors *
- *Suspicion meter rises and falls depending on how visible the player is*
- *The player loses if the suspicion meter reaches 100%*

# Learning Aspects

## Learning Domains

*Art and color theory.*

## Target Audiences

*Mid-late elementary school kids.*

## Target Contexts

*Computer labs during free time for kids of appropriate age.*

## Learning Objectives

- *Color mixing*: *By the end of this lesson, students should be able to mix specified primary colors into secondary colors*
- *Primary/secondary color identification*: *By the end of this lesson, students should be able to identify primary and secondary colors*

## Prerequisite Knowledge

- *Prior to the game, students should be able to identify colors and read color names*

## Assessment Measures

*We could use a pre and post free response quiz. Some example of possible questions are:*

- *Is red a primary color?*
- *What primary color makes up the color green?*
- *List the 3 secondary colors.*

# What sets this project apart?

- *The concept of using color matching for steatlh as a main game-play aspect is unique*
- *Color theory is not a commonly taught discipline*
- *Game has a quirky theme of having phantom thief cat main character*

# Player Interaction Patterns and Modes

## Player Interaction Pattern

*There is one player that plays at a time. They move around on a grid of paths, trying to match their color with the color of the path to navigate to a goal.*

## Player Modes

- *Single player: You advance your way through different levels, during each of which you try to navigate your way to the goal.*

# Gameplay Objectives

- *Primary Objective #1*:
  - Description: *Reach the goal while not being seen*
  - Alignment: *In order to not be seen, you need to match your color to the floor/background*

# Procedures/Actions

*Use the arrow keys to move around and the numbers to mix colors to change the player's colors.*

# Rules

- *If the player is a different color than the floor, then the suspicion meter increases*
- *If the suspicion meter becomes full, then you fail that level*
- *If the player is the same color as the floor, the suspicion meter goes down over time*
- *Once the player reaches the goal of the current level, the player moves on to the next pre-set level*
- *Over time, the levels become more complicated*

# Objects/Entities

- *Would need to design tiles for the level*
- *Goalpoint/startpoint for each level*
- *Walls so the player doesnt pass through them*
- *Guiding text when the player encounters new things*
- *Colors on the ground that you can pick up*
- *Color palette sidebar used to change the color of the player*
- *Color inventory*
- *Suspicion bar*
- *Each level / scene would have different arrangement of tiles*

## Core Gameplay Mechanics (Detailed)

- *Use arrow keys to move*: *Up-arrow moves the player up, left-arrow moves the player to the left, down-arrow moves the player down and right-arrow moves the player to the right. The player can only move on floor tiles and can not move through walls. If a player attempts to move in a direction there is a wall blocking them, they will not move.*
- *Use numbers and space to mix colors*: *The player has colors in their color inventory. There are three total spots in the inventory corresponding to the three different primary colors. Each of these spots has an associated key, Press 1 to add the first color to the palatte, 2 for the second and 3 for the third. 0 clears the palette and SPACE submits the color change of the player.*
- *Suspicion meter rises and falls depending on how visible the player is*: *While the player is standing on a tile that is a different color than they are, the suspicion meter will gradually increase. Alternatively, while the player is on a tile that is the same color, the suspicion meter will gradually decrease.*
- *The player loses if the suspicion meter reaches 100%*: *If the suspicion meter reaches 100%, then the player is spotted and shown a screen that they are caught and are prompted to restart the level*
  
## Feedback

- *The suspicion meter changes colors as your suspicion increases. Suspicion is green when low, yellow when medium, and red when high*
- *The music gets more dramatic when your suspicion increases, and is more calm when your suspicion is low*
- *You are shown some animation when you complete a level, showing the character moving onto the next level*
- *When your suspicion meter reaches 100%, a trap falls on you and you can't move, followed by another animation/scene*
- *Animation plays when you finish the final level*

# Story and Gameplay

## Presentation of Rules

*The player will run through a small tutorial level that will have visual cues (arrows, highlights, instruction pop ups) to guide the player to learn the mechanics. When new mechanics pop up, small boxes of text will guide their use.*

## Presentation of Content

*The player will learn the core material by experimenting with mixing colors and creating various color combinations while playing the game.*

## Story (Brief)

*You are a phantom thief going on a series of heists for a gem collection, but need to sneak past the guards/security in each case to grab your target.*

## Storyboarding

![Story Board](storyboard.png)

# Assets Needed

## Aethestics

*The aesthetics should be dramatic and fantastical. The story as well as the visuals that accompany should be fantasy-esque. The player should feel encouraged to keep trying if they fail to try to fix their mistake next time.*

## Graphical

- Characters List
  - *Thief / caper main character*
  - *Possible guards*
- Textures:
  - *Loot*
  - *Palette*
  - *Color inventory*
- Environment Art/Textures:
  - *Floor(various colors)*
  - *Wall*
  - *Door*

## Audio

- Music List (Ambient sound)
  - *General background music / when suspicion meter is low*: *Example 1* [Sneaky music 1](https://www.youtube.com/watch?v=HNjuMNYtXJ0), *Example 2* [Sneaky music 2](https://www.youtube.com/watch?v=XZBp0VvuUhQ)
  - *Dramatic music / when suspicion meter is high*: *Example 1* [Dramatic music 1](https://www.youtube.com/watch?v=t8WEIKBUSAw), *Example 2* [Dramatic music 2](https://www.youtube.com/watch?v=Jaa4qxeFdZQ)
  
- Sound List (SFX)
  - *Getting caught sound effect*: *Alarm sound*, *Siron sound*
  - *Completing level*: *Triumphant music* [Triumphant music](https://www.youtube.com/watch?v=tJW9anm540M)
  - *Sound effect for picking up object*: *Pick up object* [Pick up](https://freesound.org/people/LittleRobotSoundFactory/sounds/270337/)
