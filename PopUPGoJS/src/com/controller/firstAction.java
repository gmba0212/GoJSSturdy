package com.controller;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class firstAction implements Action {

	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String url = "../jsp/secondPage.jsp";
		RequestDispatcher dispatcher = request.getRequestDispatcher(url);
		System.out.println("call secondPage.jsp");
		dispatcher.forward(request, response);
	}

}
