
import React from "react";
import Login from "./Login"
import { mount, shallow } from "enzyme";
import Adapter from 'enzyme-adapter-react-15';
configure({adapter: new Adapter()});

describe("Testing Login Component", () => {
    let login = mount(<Login />)

    it("Renders Login Component", () => {
        expect(login.find("h2").text()).toEqual("Login");
    })
})  