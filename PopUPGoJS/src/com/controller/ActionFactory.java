package com.controller;

public class ActionFactory {
	private static ActionFactory instance = new ActionFactory();
	
	private ActionFactory() {
		super();
	}
	
	public static ActionFactory getInstance() {
		return instance;
	}
	public Action getAction(String command) {
		Action action = null;
		System.out.println("ActionFactory : "+command);
		if(command.equals("firstPage")) {
			action = new firstAction();
		}else if(command.equals("second")) {
			action = new secondAction();
		}
		return action;
	}
}