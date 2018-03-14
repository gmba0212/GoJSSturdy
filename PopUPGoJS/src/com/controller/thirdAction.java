package com.controller;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class thirdAction implements Action {

	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String url ="jsp/startJSP.jsp";
		
		System.out.println("getParameter of "+request.getParameter("command")+" :"+request.getParameter("obj"));
		response.sendRedirect(url);
		
	}

}
