package com.controller;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class secondAction implements Action {

	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String url = "jsp/thirdPage.jsp";
		System.out.println("go ! thidpage!!!");
		RequestDispatcher rd=request.getRequestDispatcher(url);
		rd.forward(request, response);
		//response.sendRedirect(url);
	}

}
