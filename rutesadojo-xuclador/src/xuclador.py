# To change this template, choose Tools | Templates
# and open the template in the editor.

__author__="xavi"
__date__ ="$15-oct-2011 7:51:06$"

from urllib2 import urlopen
from HTMLParser import HTMLParser

class Spider(HTMLParser):

	def cec_start(self, tag, attrs):
		if tag == 'div' and ('activity_item' in attrs[0]
		or 'activity_item_last' in attrs[0]) :
			#print attrs
			self.inHeading = True

	def cec_end(self, tag):
		if self.inHeading and tag == 'div' :
			#print attrs
			self.inHeading = False

	def cec_data(self, data):
		if self.inHeading :
			print(data)

	def __init__(self, url, name):
		self.src = name
		self.inHeading = False
		HTMLParser.__init__(self)
		req = urlopen(url)
		self.feed(req.read())

	def handle_starttag(self, tag, attrs):
		if self.src == 'cec' :
			self.cec_start(tag, attrs)

	def handle_data(self, data):
		if self.src == 'cec' :
			self.cec_data(data)

	def handle_endtag(self, tag):
		if self.src == 'cec' :
			self.cec_end(tag)

if __name__ == "__main__":
	url = 'http://www.cec.cat/default.aspx' # write ur URL here
	Spider(url, 'cec')
