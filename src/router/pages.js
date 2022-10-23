import React from 'react'
import {Redirect} from 'react-router-dom';

import SelectNetwork from '../pages/network/SelectNetwork'
import ImportNft from '../pages/importNft/ImportNft'

import Game from '../pages/game/Game'
import GameEnd from '../pages/game/GameEnd'
import GamePage from '../pages/game/GamesPage'
import WithdrawalFunds from '../pages/game/WithdrawalFunds'
import Completed from '../pages/game/Completed'

const publicRoutes = [
    {path: "*", component: () => <Redirect to="/"/>},
]

const privateRoutes = [
    {path: "/", component: <SelectNetwork/>},

    {path: "/select-network", component: <SelectNetwork/>},

    {path: "/import-nft", component: <ImportNft/>},

    {path: "/select-game/:contract_address/:token_id", component: <SelectGame/>},

    {path: "/game", component: <Game/>},

    {path: "/game-page", component: <GamePage/>},

    {path: "/game-end", component: <GameEnd/>},

    {path: "/withdrawal-funds", component: <WithdrawalFunds/>},

    {path: "/completed", component: <Completed/>},

    {path: "*", component: () => <Redirect to="/"/>},
]

export {publicRoutes, privateRoutes}