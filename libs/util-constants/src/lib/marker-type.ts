export enum Allegiance {
    Friendly,
    Hostile,
    Neutral,
    Unknown
}

export enum Type {
    // Ground
    FriendlyAirDefense = 'f-airdefense',
    FriendlyAmphibious = 'f-amphibious',
    FriendlyArmor = 'f-armor-armored-mechanized-self–propelled-tracked',
    FriendlyAviationFixedWing = 'f-aviationfixedwing',
    FriendlyBand = 'f-band',
    FriendlyCombinedArms = 'f-combinedarms',
    FriendlyCounterIntelligence = 'f-counterintelligence',
    FriendlyElectronicWarfare = 'f-electronicwarfare',
    FriendlyFieldArtillery = 'f-fieldartillery',
    FriendlyInfantry = 'f-infantry',
    FriendlyMissileDefense = 'f-missiledefense',
    FriendlyNaval = 'f-naval',
    FriendlyReconnaissanceCavalryScount = 'f-reconnaissance-cavalry-scout',
    FriendlyReconnaissance = 'f-reconnaissance',
    FriendlyShorePatrol = 'f-shorepatrol',
    FriendlySurveillance = 'f-surveillance',
    HostileAirDefense = 'h-airdefense',
    HostileAmphibious = 'h-amphibious',
    HostileArmor = 'h-armor-armored-mechanized-self–propelled-tracked',
    HostileAviationFixedWing = 'h-aviationfixedwing',
    HostileBand = 'h-band',
    HostileCombinedArms = 'h-combinedarms',
    HostileCounterIntelligence = 'h-counterintelligence',
    HostileElectronicWarfare = 'h-electronicwarfare',
    HostileFieldArtillery = 'h-fieldartillery',
    HostileInfantry = 'h-infantry',
    HostileMissileDefense = 'h-missiledefense',
    HostileNaval = 'h-naval',
    HostileReconnaissanceCavalryScount = 'h-reconnaissance-cavalry-scout',
    HostileReconnaissance = 'h-reconnaissance',
    HostileShorePatrol = 'h-shorepatrol',
    HostileSurveillance = 'h-surveillance',
    NeutralAirDefense = 'n-airdefense',
    NeutralAmphibious = 'n-amphibious',
    NeutralArmor = 'n-armor-armored-mechanized-self–propelled-tracked',
    NeutralAviationFixedWing = 'n-aviationfixedwing',
    NeutralBand = 'n-band',
    NeutralCombinedArms = 'n-combinedarms',
    NeutralCounterIntelligence = 'n-counterintelligence',
    NeutralElectronicWarfare = 'n-electronicwarfare',
    NeutralFieldArtillery = 'n-fieldartillery',
    NeutralInfantry = 'n-infantry',
    NeutralMissileDefense = 'n-missiledefense',
    NeutralNaval = 'n-naval',
    NeutralReconnaissanceCavalryScount = 'n-reconnaissance-cavalry-scout',
    NeutralReconnaissance = 'n-reconnaissance',
    NeutralShorePatrol = 'n-shorepatrol',
    NeutralSurveillance = 'n-surveillance',
    UnknownAirDefense = 'u-airdefense',
    UnknownAmphibious = 'u-amphibious',
    UnknownArmor = 'u-armor-armored-mechanized-self–propelled-tracked',
    UnknownAviationFixedWing = 'u-aviationfixedwing',
    UnknownBand = 'u-band',
    UnknownCombinedArms = 'u-combinedarms',
    UnknownCounterIntelligence = 'u-counterintelligence',
    UnknownElectronicWarfare = 'u-electronicwarfare',
    UnknownFieldArtillery = 'u-fieldartillery',
    UnknownInfantry = 'u-infantry',
    UnknownMissileDefense = 'u-missiledefense',
    UnknownNaval = 'u-naval',
    UnknownReconnaissanceCavalryScount = 'u-reconnaissance-cavalry-scout',
    UnknownReconnaissance = 'u-reconnaissance',
    UnknownShorePatrol = 'u-shorepatrol',
    UnknownSurveillance = 'u-surveillance',

    // Air
    FriendlyAttackStrike = 'f-attack-strike-notapplicable',
    FriendlyFixedwing = 'f-fixedwing-notapplicable',
    FriendlyAirPatrol = 'f-patrol-notapplicable',
    FriendlyRotarywing = 'f-rotarywing-notapplicable',
    FriendlySead = 'f-suppressionofenemyairdefense-notapplicable',
    HostileAttackStrike = 'h-attack-strike-notapplicable',
    HostileFixedwing = 'h-fixedwing-notapplicable',
    HostileAirPatrol = 'h-patrol-notapplicable',
    HostileRotarywing = 'h-rotarywing-notapplicable',
    HostileSead = 'h-suppressionofenemyairdefense-notapplicable',
    NeutralAttackStrike = 'n-attack-strike-notapplicable',
    NeutralFixedwing = 'n-fixedwing-notapplicable',
    NeutralAirPatrol = 'n-patrol-notapplicable',
    NeutralRotarywing = 'n-rotarywing-notapplicable',
    NeutralSead = 'n-suppressionofenemyairdefense-notapplicable',
    UnknownAttackStrike = 'u-attack-strike-notapplicable',
    UnknownFixedwing = 'u-fixedwing-notapplicable',
    UnknownAirPatrol = 'u-patrol-notapplicable',
    UnknownRotarywing = 'u-rotarywing-notapplicable',
    UnknownSead = 'u-suppressionofenemyairdefense-notapplicable',

    // Sea
    FriendlyBattleship = 'f-battleship',
    FriendlyCarrier = 'f-carrier',
    FriendlyCorvette = 'f-corvette',
    FriendlyCruiser = 'f-cruiser',
    FriendlyDestroyer = 'f-destroyer',
    FriendlyFrigate = 'f-frigate',
    FriendlyLandingship = 'f-landingship',
    FriendlyNavyTaskOrganization = 'f-navytaskorganization',
    FriendlyAttackSubmarine = 'f-submarineattack',
    FriendlyBallisticSubmarine = 'f-submarineballistic',
    FriendlyGuidedMissileSubmarine = 'f-submarineguided',
    HostileBattleship = 'h-battleship',
    HostileCarrier = 'h-carrier',
    HostileCorvette = 'h-corvette',
    HostileCruiser = 'h-cruiser',
    HostileDestroyer = 'h-destroyer',
    HostileFrigate = 'h-frigate',
    HostileLandingship = 'h-landingship',
    HostileNavyTaskOrganization = 'h-navytaskorganization',
    HostileAttackSubmarine = 'h-submarineattack',
    HostileBallisticSubmarine = 'h-submarineballistic',
    HostileGuidedMissileSubmarine = 'h-submarineguided',
    NeutralBattleship = 'n-battleship',
    NeutralCarrier = 'n-carrier',
    NeutralCorvette = 'n-corvette',
    NeutralCruiser = 'n-cruiser',
    NeutralDestroyer = 'n-destroyer',
    NeutralFrigate = 'n-frigate',
    NeutralLandingship = 'n-landingship',
    NeutralNavyTaskOrganization = 'n-navytaskorganization',
    NeutralAttackSubmarine = 'n-submarineattack',
    NeutralBallisticSubmarine = 'n-submarineballistic',
    NeutralGuidedMissileSubmarine = 'n-submarineguided',
    UnknownBattleship = 'u-battleship',
    UnknownCarrier = 'u-carrier',
    UnknownCorvette = 'u-corvette',
    UnknownCruiser = 'u-cruiser',
    UnknownDestroyer = 'u-destroyer',
    UnknownFrigate = 'u-frigate',
    UnknownLandingship = 'u-landingship',
    UnknownNavyTaskOrganization = 'u-navytaskorganization',
    UnknownAttackSubmarine = 'u-submarineattack',
    UnknownBallisticSubmarine = 'u-submarineballistic',
    UnknownGuidedMissileSubmarine = 'u-submarineguided',

    // Misc
    FriendlyAirbase = 'f-airport-airbase-notapplicable',
    FriendlyInfiltration = 'f-infiltration-notapplicable',
    FriendlyMilitaryBase = 'f-militarybase-notapplicable',
    FriendlySeaport = 'f-seaport-navalbase-notapplicable',
    HostileAirbase = 'h-airport-airbase-notapplicable',
    HostileInfiltration = 'h-infiltration-notapplicable',
    HostileMilitaryBase = 'h-militarybase-notapplicable',
    HostileSeaport = 'h-seaport-navalbase-notapplicable',
    NeutralAirbase = 'n-airport-airbase-notapplicable',
    NeutralInfiltration = 'n-infiltration-notapplicable',
    NeutralMilitaryBase = 'n-militarybase-notapplicable',
    NeutralSeaport = 'n-seaport-navalbase-notapplicable',
    UnknownAirbase = 'u-airport-airbase-notapplicable',
    UnknownInfiltration = 'u-infiltration-notapplicable',
    UnknownMilitaryBase = 'u-militarybase-notapplicable',
    UnknownSeaport = 'u-seaport-navalbase-notapplicable',
}

export function toString(type: Type): string {
    switch (type) {
        // Ground
        case Type.FriendlyAirDefense:
            return 'Friendly Air Defense';
        case Type.FriendlyAmphibious:
            return 'Friendly Amphibious';
        case Type.FriendlyArmor:
            return 'Friendly Armor';
        case Type.FriendlyAviationFixedWing:
            return 'Friendly Fixed Wing (Army)';
        case Type.FriendlyBand:
            return 'Friendly Band';
        case Type.FriendlyCombinedArms:
            return 'Friendly Combined Arms';
        case Type.FriendlyCounterIntelligence:
            return 'Friendly Counter-Intelligence';
        case Type.FriendlyElectronicWarfare:
            return 'Friendly Electronic Warfare';
        case Type.FriendlyFieldArtillery:
            return 'Friendly Field Artillery';
        case Type.FriendlyInfantry:
            return 'Friendly Infantry';
        case Type.FriendlyMissileDefense:
            return 'Friendly Missile Defense';
        case Type.FriendlyNaval:
            return 'Friendly Naval';
        case Type.FriendlyReconnaissanceCavalryScount:
            return 'Friendly Reconnaissance - Cavalry, Scout';
        case Type.FriendlyReconnaissance:
            return 'Friendly Reconnaissance';
        case Type.FriendlyShorePatrol:
            return 'Friendly Shore Patrol';
        case Type.FriendlySurveillance:
            return 'Friendly Surveillance';
        case Type.HostileAirDefense:
            return 'Hostile Air Defense';
        case Type.HostileAmphibious:
            return 'Hostile Amphibious';
        case Type.HostileArmor:
            return 'Hostile Armor';
        case Type.HostileAviationFixedWing:
            return 'Hostile Fixed Wing (Army)';
        case Type.HostileBand:
            return 'Hostile Band';
        case Type.HostileCombinedArms:
            return 'Hostile Combined Arms';
        case Type.HostileCounterIntelligence:
            return 'Hostile Counter-Intelligence';
        case Type.HostileElectronicWarfare:
            return 'Hostile Electronic Warfare';
        case Type.HostileFieldArtillery:
            return 'Hostile Field Artillery';
        case Type.HostileInfantry:
            return 'Hostile Infantry';
        case Type.HostileMissileDefense:
            return 'Hostile Missile Defense';
        case Type.HostileNaval:
            return 'Hostile Naval';
        case Type.HostileReconnaissanceCavalryScount:
            return 'Hostile Reconnaissance - Cavalry, Scout';
        case Type.HostileReconnaissance:
            return 'Hostile Reconnaissance';
        case Type.HostileShorePatrol:
            return 'Hostile Shore Patrol';
        case Type.HostileSurveillance:
            return 'Hostile Surveillance';
        case Type.NeutralAirDefense:
            return 'Neutral Air Defense';
        case Type.NeutralAmphibious:
            return 'Neutral Amphibious';
        case Type.NeutralArmor:
            return 'Neutral Armor';
        case Type.NeutralAviationFixedWing:
            return 'Neutral Fixed Wing (Army)';
        case Type.NeutralBand:
            return 'Neutral Band';
        case Type.NeutralCombinedArms:
            return 'Neutral Combined Arms';
        case Type.NeutralCounterIntelligence:
            return 'Neutral Counter-Intelligence';
        case Type.NeutralElectronicWarfare:
            return 'Neutral Electronic Warfare';
        case Type.NeutralFieldArtillery:
            return 'Neutral Field Artillery';
        case Type.NeutralInfantry:
            return 'Neutral Infantry';
        case Type.NeutralMissileDefense:
            return 'Neutral Missile Defense';
        case Type.NeutralNaval:
            return 'Neutral Naval';
        case Type.NeutralReconnaissanceCavalryScount:
            return 'Neutral Reconnaissance - Cavalry, Scout';
        case Type.NeutralReconnaissance:
            return 'Neutral Reconnaissance';
        case Type.NeutralShorePatrol:
            return 'Neutral Shore Patrol';
        case Type.NeutralSurveillance:
            return 'Neutral Surveillance';
        case Type.UnknownAirDefense:
            return 'Unknown Air Defense';
        case Type.UnknownAmphibious:
            return 'Unknown Amphibious';
        case Type.UnknownArmor:
            return 'Unknown Armor';
        case Type.UnknownAviationFixedWing:
            return 'Unknown Fixed Wing (Army)';
        case Type.UnknownBand:
            return 'Unknown Band';
        case Type.UnknownCombinedArms:
            return 'Unknown Combined Arms';
        case Type.UnknownCounterIntelligence:
            return 'Unknown Counter-Intelligence';
        case Type.UnknownElectronicWarfare:
            return 'Unknown Electronic Warfare';
        case Type.UnknownFieldArtillery:
            return 'Unknown Field Artillery';
        case Type.UnknownInfantry:
            return 'Unknown Infantry';
        case Type.UnknownMissileDefense:
            return 'Unknown Missile Defense';
        case Type.UnknownNaval:
            return 'Unknown Naval';
        case Type.UnknownReconnaissanceCavalryScount:
            return 'Unknown Reconnaissance - Cavalry, Scout';
        case Type.UnknownReconnaissance:
            return 'Unknown Reconnaissance';
        case Type.UnknownShorePatrol:
            return 'Unknown Shore Patrol';
        case Type.UnknownSurveillance:
            return 'Unknown Surveillance';

        // Air
        case Type.FriendlyAttackStrike:
            return 'Friendly Strike Aircraft';
        case Type.FriendlyFixedwing:
            return 'Friendly Fixed-Wing';
        case Type.FriendlyAirPatrol:
            return 'Friendly Air Patrol';
        case Type.FriendlyRotarywing:
            return 'Friendly Rotary-Wing';
        case Type.FriendlySead:
            return 'Friendly SEAD';
        case Type.HostileAttackStrike:
            return 'Hostile Strike Aircraft';
        case Type.HostileFixedwing:
            return 'Hostile Fixed-Wing';
        case Type.HostileAirPatrol:
            return 'Hostile Air Patrol';
        case Type.HostileRotarywing:
            return 'Hostile Rotary-Wing';
        case Type.HostileSead:
            return 'Hostile SEAD';
        case Type.NeutralAttackStrike:
            return 'Neutral Strike Aircraft';
        case Type.NeutralFixedwing:
            return 'Neutral Fixed-Wing';
        case Type.NeutralAirPatrol:
            return 'Neutral Air Patrol';
        case Type.NeutralRotarywing:
            return 'Neutral Rotary-Wing';
        case Type.NeutralSead:
            return 'Neutral SEAD';
        case Type.UnknownAttackStrike:
            return 'Unknown Strike Aircraft';
        case Type.UnknownFixedwing:
            return 'Unknown Fixed-Wing';
        case Type.UnknownAirPatrol:
            return 'Unknown Air Patrol';
        case Type.UnknownRotarywing:
            return 'Unknown Rotary-Wing';
        case Type.UnknownSead:
            return 'Unknown SEAD';

        // Sea
        case Type.FriendlyBattleship:
            return 'Friendly Battleship';
        case Type.FriendlyCarrier:
            return 'Friendly Carrier';
        case Type.FriendlyCorvette:
            return 'Friendly Corvette';
        case Type.FriendlyCruiser:
            return 'Friendly Cruiser';
        case Type.FriendlyDestroyer:
            return 'Friendly Destroyer';
        case Type.FriendlyFrigate:
            return 'Friendly Frigate';
        case Type.FriendlyLandingship:
            return 'Friendly Landing Ship';
        case Type.FriendlyNavyTaskOrganization:
            return 'Friendly Navy Task Organization';
        case Type.FriendlyAttackSubmarine:
            return 'Friendly Attack Submarine';
        case Type.FriendlyBallisticSubmarine:
            return 'Friendly Ballistic Submarine';
        case Type.FriendlyGuidedMissileSubmarine:
            return 'Friendly Guided Missile Submarine';
        case Type.HostileBattleship:
            return 'Hostile Battleship';
        case Type.HostileCarrier:
            return 'Hostile Carrier';
        case Type.HostileCorvette:
            return 'Hostile Corvette';
        case Type.HostileCruiser:
            return 'Hostile Cruiser';
        case Type.HostileDestroyer:
            return 'Hostile Destroyer';
        case Type.HostileFrigate:
            return 'Hostile Frigate';
        case Type.HostileLandingship:
            return 'Hostile Landing Ship';
        case Type.HostileNavyTaskOrganization:
            return 'Hostile Navy Task Organization';
        case Type.HostileAttackSubmarine:
            return 'Hostile Attack Submarine';
        case Type.HostileBallisticSubmarine:
            return 'Hostile Ballistic Submarine';
        case Type.HostileGuidedMissileSubmarine:
            return 'Hostile Guided Missile Submarine';
        case Type.NeutralBattleship:
            return 'Neutral Battleship';
        case Type.NeutralCarrier:
            return 'Neutral Carrier';
        case Type.NeutralCorvette:
            return 'Neutral Corvette';
        case Type.NeutralCruiser:
            return 'Neutral Cruiser';
        case Type.NeutralDestroyer:
            return 'Neutral Destroyer';
        case Type.NeutralFrigate:
            return 'Neutral Frigate';
        case Type.NeutralLandingship:
            return 'Neutral Landing Ship';
        case Type.NeutralNavyTaskOrganization:
            return 'Neutral Navy Task Organization';
        case Type.NeutralAttackSubmarine:
            return 'Neutral Attack Submarine';
        case Type.NeutralBallisticSubmarine:
            return 'Neutral Ballistic Submarine';
        case Type.NeutralGuidedMissileSubmarine:
            return 'Neutral Guided Missile Submarine';
        case Type.UnknownBattleship:
            return 'Unknown Battleship';
        case Type.UnknownCarrier:
            return 'Unknown Carrier';
        case Type.UnknownCorvette:
            return 'Unknown Corvette';
        case Type.UnknownCruiser:
            return 'Unknown Cruiser';
        case Type.UnknownDestroyer:
            return 'Unknown Destroyer';
        case Type.UnknownFrigate:
            return 'Unknown Frigate';
        case Type.UnknownLandingship:
            return 'Unknown Landing Ship';
        case Type.UnknownNavyTaskOrganization:
            return 'Unknown Navy Task Organization';
        case Type.UnknownAttackSubmarine:
            return 'Unknown Attack Submarine';
        case Type.UnknownBallisticSubmarine:
            return 'Unknown Ballistic Submarine';
        case Type.UnknownGuidedMissileSubmarine:
            return 'Unknown Guided Missile Submarine';

        // Misc
        case Type.FriendlyAirbase:
            return 'Friendly Airbase';
        case Type.FriendlyInfiltration:
            return 'Friendly Infiltration';
        case Type.FriendlyMilitaryBase:
            return 'Friendly Military Base';
        case Type.FriendlySeaport:
            return 'Friendly Seaport/Seabase';
        case Type.HostileAirbase:
            return 'Hostile Airbase';
        case Type.HostileInfiltration:
            return 'Hostile Infiltration';
        case Type.HostileMilitaryBase:
            return 'Hostile Military Base';
        case Type.HostileSeaport:
            return 'Hostile Seaport/Seabase';
        case Type.NeutralAirbase:
            return 'Neutral Airbase';
        case Type.NeutralInfiltration:
            return 'Neutral Infiltration';
        case Type.NeutralMilitaryBase:
            return 'Neutral Military Base';
        case Type.NeutralSeaport:
            return 'Neutral Seaport/Seabase';
        case Type.UnknownAirbase:
            return 'Unknown Airbase';
        case Type.UnknownInfiltration:
            return 'Unknown Infiltration';
        case Type.UnknownMilitaryBase:
            return 'Unknown Military Base';
        case Type.UnknownSeaport:
            return 'Unknown Seaport/Seabase';
    }
}

export function forAllegiance(allegiance: Allegiance | undefined): readonly Type[] {
    switch (allegiance) {
        case Allegiance.Friendly:
            return friendly;
        case Allegiance.Hostile:
            return hostile;
        case Allegiance.Neutral:
            return neutral;
        case Allegiance.Unknown:
            return unknown;
        default:
            return all;
    }
}

export const friendly = [
    Type.FriendlyAirDefense,
    Type.FriendlyAmphibious,
    Type.FriendlyArmor,
    Type.FriendlyAviationFixedWing,
    Type.FriendlyBand,
    Type.FriendlyCombinedArms,
    Type.FriendlyCounterIntelligence,
    Type.FriendlyElectronicWarfare,
    Type.FriendlyFieldArtillery,
    Type.FriendlyInfantry,
    Type.FriendlyMissileDefense,
    Type.FriendlyNaval,
    Type.FriendlyReconnaissanceCavalryScount,
    Type.FriendlyReconnaissance,
    Type.FriendlyShorePatrol,
    Type.FriendlySurveillance,
    Type.FriendlyAttackStrike,
    Type.FriendlyFixedwing,
    Type.FriendlyAirPatrol,
    Type.FriendlyRotarywing,
    Type.FriendlySead,
    Type.FriendlyBattleship,
    Type.FriendlyCarrier,
    Type.FriendlyCorvette,
    Type.FriendlyCruiser,
    Type.FriendlyDestroyer,
    Type.FriendlyFrigate,
    Type.FriendlyLandingship,
    Type.FriendlyNavyTaskOrganization,
    Type.FriendlyAttackSubmarine,
    Type.FriendlyBallisticSubmarine,
    Type.FriendlyGuidedMissileSubmarine,
    Type.FriendlyAirbase,
    Type.FriendlyInfiltration,
    Type.FriendlyMilitaryBase,
    Type.FriendlySeaport,
] as const;
export const hostile = [
    Type.HostileAirDefense,
    Type.HostileAmphibious,
    Type.HostileArmor,
    Type.HostileAviationFixedWing,
    Type.HostileBand,
    Type.HostileCombinedArms,
    Type.HostileCounterIntelligence,
    Type.HostileElectronicWarfare,
    Type.HostileFieldArtillery,
    Type.HostileInfantry,
    Type.HostileMissileDefense,
    Type.HostileNaval,
    Type.HostileReconnaissanceCavalryScount,
    Type.HostileReconnaissance,
    Type.HostileShorePatrol,
    Type.HostileSurveillance,
    Type.HostileAttackStrike,
    Type.HostileFixedwing,
    Type.HostileAirPatrol,
    Type.HostileRotarywing,
    Type.HostileSead,
    Type.HostileBattleship,
    Type.HostileCarrier,
    Type.HostileCorvette,
    Type.HostileCruiser,
    Type.HostileDestroyer,
    Type.HostileFrigate,
    Type.HostileLandingship,
    Type.HostileNavyTaskOrganization,
    Type.HostileAttackSubmarine,
    Type.HostileBallisticSubmarine,
    Type.HostileGuidedMissileSubmarine,
    Type.HostileAirbase,
    Type.HostileInfiltration,
    Type.HostileMilitaryBase,
    Type.HostileSeaport,
] as const;
export const neutral = [
    Type.NeutralAirDefense,
    Type.NeutralAmphibious,
    Type.NeutralArmor,
    Type.NeutralAviationFixedWing,
    Type.NeutralBand,
    Type.NeutralCombinedArms,
    Type.NeutralCounterIntelligence,
    Type.NeutralElectronicWarfare,
    Type.NeutralFieldArtillery,
    Type.NeutralInfantry,
    Type.NeutralMissileDefense,
    Type.NeutralNaval,
    Type.NeutralReconnaissanceCavalryScount,
    Type.NeutralReconnaissance,
    Type.NeutralShorePatrol,
    Type.NeutralSurveillance,
    Type.NeutralAttackStrike,
    Type.NeutralFixedwing,
    Type.NeutralAirPatrol,
    Type.NeutralRotarywing,
    Type.NeutralSead,
    Type.NeutralBattleship,
    Type.NeutralCarrier,
    Type.NeutralCorvette,
    Type.NeutralCruiser,
    Type.NeutralDestroyer,
    Type.NeutralFrigate,
    Type.NeutralLandingship,
    Type.NeutralNavyTaskOrganization,
    Type.NeutralAttackSubmarine,
    Type.NeutralBallisticSubmarine,
    Type.NeutralGuidedMissileSubmarine,
    Type.NeutralAirbase,
    Type.NeutralInfiltration,
    Type.NeutralMilitaryBase,
    Type.NeutralSeaport,
] as const;
export const unknown = [
    Type.UnknownAirDefense,
    Type.UnknownAmphibious,
    Type.UnknownArmor,
    Type.UnknownAviationFixedWing,
    Type.UnknownBand,
    Type.UnknownCombinedArms,
    Type.UnknownCounterIntelligence,
    Type.UnknownElectronicWarfare,
    Type.UnknownFieldArtillery,
    Type.UnknownInfantry,
    Type.UnknownMissileDefense,
    Type.UnknownNaval,
    Type.UnknownReconnaissanceCavalryScount,
    Type.UnknownReconnaissance,
    Type.UnknownShorePatrol,
    Type.UnknownSurveillance,
    Type.UnknownAttackStrike,
    Type.UnknownFixedwing,
    Type.UnknownAirPatrol,
    Type.UnknownRotarywing,
    Type.UnknownSead,
    Type.UnknownBattleship,
    Type.UnknownCarrier,
    Type.UnknownCorvette,
    Type.UnknownCruiser,
    Type.UnknownDestroyer,
    Type.UnknownFrigate,
    Type.UnknownLandingship,
    Type.UnknownNavyTaskOrganization,
    Type.UnknownAttackSubmarine,
    Type.UnknownBallisticSubmarine,
    Type.UnknownGuidedMissileSubmarine,
    Type.UnknownAirbase,
    Type.UnknownInfiltration,
    Type.UnknownMilitaryBase,
    Type.UnknownSeaport,
] as const;

export const all = [
    Type.FriendlyAirDefense,
    Type.FriendlyAmphibious,
    Type.FriendlyArmor,
    Type.FriendlyAviationFixedWing,
    Type.FriendlyBand,
    Type.FriendlyCombinedArms,
    Type.FriendlyCounterIntelligence,
    Type.FriendlyElectronicWarfare,
    Type.FriendlyFieldArtillery,
    Type.FriendlyInfantry,
    Type.FriendlyMissileDefense,
    Type.FriendlyNaval,
    Type.FriendlyReconnaissanceCavalryScount,
    Type.FriendlyReconnaissance,
    Type.FriendlyShorePatrol,
    Type.FriendlySurveillance,
    Type.HostileAirDefense,
    Type.HostileAmphibious,
    Type.HostileArmor,
    Type.HostileAviationFixedWing,
    Type.HostileBand,
    Type.HostileCombinedArms,
    Type.HostileCounterIntelligence,
    Type.HostileElectronicWarfare,
    Type.HostileFieldArtillery,
    Type.HostileInfantry,
    Type.HostileMissileDefense,
    Type.HostileNaval,
    Type.HostileReconnaissanceCavalryScount,
    Type.HostileReconnaissance,
    Type.HostileShorePatrol,
    Type.HostileSurveillance,
    Type.NeutralAirDefense,
    Type.NeutralAmphibious,
    Type.NeutralArmor,
    Type.NeutralAviationFixedWing,
    Type.NeutralBand,
    Type.NeutralCombinedArms,
    Type.NeutralCounterIntelligence,
    Type.NeutralElectronicWarfare,
    Type.NeutralFieldArtillery,
    Type.NeutralInfantry,
    Type.NeutralMissileDefense,
    Type.NeutralNaval,
    Type.NeutralReconnaissanceCavalryScount,
    Type.NeutralReconnaissance,
    Type.NeutralShorePatrol,
    Type.NeutralSurveillance,
    Type.UnknownAirDefense,
    Type.UnknownAmphibious,
    Type.UnknownArmor,
    Type.UnknownAviationFixedWing,
    Type.UnknownBand,
    Type.UnknownCombinedArms,
    Type.UnknownCounterIntelligence,
    Type.UnknownElectronicWarfare,
    Type.UnknownFieldArtillery,
    Type.UnknownInfantry,
    Type.UnknownMissileDefense,
    Type.UnknownNaval,
    Type.UnknownReconnaissanceCavalryScount,
    Type.UnknownReconnaissance,
    Type.UnknownShorePatrol,
    Type.UnknownSurveillance,

    // Air
    Type.FriendlyAttackStrike,
    Type.FriendlyFixedwing,
    Type.FriendlyAirPatrol,
    Type.FriendlyRotarywing,
    Type.FriendlySead,
    Type.HostileAttackStrike,
    Type.HostileFixedwing,
    Type.HostileAirPatrol,
    Type.HostileRotarywing,
    Type.HostileSead,
    Type.NeutralAttackStrike,
    Type.NeutralFixedwing,
    Type.NeutralAirPatrol,
    Type.NeutralRotarywing,
    Type.NeutralSead,
    Type.UnknownAttackStrike,
    Type.UnknownFixedwing,
    Type.UnknownAirPatrol,
    Type.UnknownRotarywing,
    Type.UnknownSead,

    // Sea
    Type.FriendlyBattleship,
    Type.FriendlyCarrier,
    Type.FriendlyCorvette,
    Type.FriendlyCruiser,
    Type.FriendlyDestroyer,
    Type.FriendlyFrigate,
    Type.FriendlyLandingship,
    Type.FriendlyNavyTaskOrganization,
    Type.FriendlyAttackSubmarine,
    Type.FriendlyBallisticSubmarine,
    Type.FriendlyGuidedMissileSubmarine,
    Type.HostileBattleship,
    Type.HostileCarrier,
    Type.HostileCorvette,
    Type.HostileCruiser,
    Type.HostileDestroyer,
    Type.HostileFrigate,
    Type.HostileLandingship,
    Type.HostileNavyTaskOrganization,
    Type.HostileAttackSubmarine,
    Type.HostileBallisticSubmarine,
    Type.HostileGuidedMissileSubmarine,
    Type.NeutralBattleship,
    Type.NeutralCarrier,
    Type.NeutralCorvette,
    Type.NeutralCruiser,
    Type.NeutralDestroyer,
    Type.NeutralFrigate,
    Type.NeutralLandingship,
    Type.NeutralNavyTaskOrganization,
    Type.NeutralAttackSubmarine,
    Type.NeutralBallisticSubmarine,
    Type.NeutralGuidedMissileSubmarine,
    Type.UnknownBattleship,
    Type.UnknownCarrier,
    Type.UnknownCorvette,
    Type.UnknownCruiser,
    Type.UnknownDestroyer,
    Type.UnknownFrigate,
    Type.UnknownLandingship,
    Type.UnknownNavyTaskOrganization,
    Type.UnknownAttackSubmarine,
    Type.UnknownBallisticSubmarine,
    Type.UnknownGuidedMissileSubmarine,

    // Misc
    Type.FriendlyAirbase,
    Type.FriendlyInfiltration,
    Type.FriendlyMilitaryBase,
    Type.FriendlySeaport,
    Type.HostileAirbase,
    Type.HostileInfiltration,
    Type.HostileMilitaryBase,
    Type.HostileSeaport,
    Type.NeutralAirbase,
    Type.NeutralInfiltration,
    Type.NeutralMilitaryBase,
    Type.NeutralSeaport,
    Type.UnknownAirbase,
    Type.UnknownInfiltration,
    Type.UnknownMilitaryBase,
    Type.UnknownSeaport,
] as const;
