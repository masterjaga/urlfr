import React from 'react';
import ReactTable from '../react-table/react-table';
import { getMostViewUrl } from "../ApiHelper";

import './urlvisit.css';

class Urlvisit extends React.Component
{

  get initialData()
  {
    return this.state.originalData;
  }

  get nextData()
  {
    return this.state.originalData;
  }

  get columns()
  {
    return [{
      name: "Long Url",
      accessor: "longUrl"
    },{
      name: "Short Url",
      accessor: "shortUrl"
    },{
      name: "Visit(s)",
      accessor: function(row)
      {
        return row.counter;
      }
    },{
      name: "Browse",
      accessor: function(row)
      {
        return <a href={row.shortUrl} target="_blank">{row.shortUrl}</a>;
      }
    }];
  }

  constructor(props)
  {
    super(props);
    this.state = {};
    this.state.originalData = [];
    this.state.data = this.initialData;
    this.state.columns = this.columns;
    this.state.showLoading = true;
  }

  componentDidMount()
  {
    setInterval(() => {
        getMostViewUrl()
        .then(json => {
        setTimeout(() => {
            this.setState({
            showLoading: false,
            showApiError: false,
            data: json.data,
            originalData: json.data
            });
        }, 0);
        })
        .catch(error => {
        this.setState({
            showLoading: false,
            showApiError: true,
            apiError: "Server Error",
            originalData: [],
            data: []
        });
        });
    }, 2000);

  }

  handlePageChange(oldPage, lastObject, newPage)
  {
    switch(newPage)
    {
      case 1:
        this.setState({data: this.initialData});
        break;
      case 2:
        this.setState({data: this.nextData});
        break;
      default: 
        this.setState({data: this.initialData});
    }
  }

  handleFilter(filterInput)
  {
    if(filterInput.trim() === '')
    {
      this.setState({data: this.initialData});
    }
    else
    {
      let filteredData = [];

      this.initialData.forEach((element) => 
      {
        if(element.longUrl.includes(filterInput))
        {
            if (!filteredData.some(item => element.longUrl === item.longUrl))
            {
                filteredData.push(element);
            }
        }
      });

      this.nextData.forEach((element) => 
      {
        if(element.longUrl.includes(filterInput))
        {
            if (!filteredData.some(item => element.longUrl === item.longUrl))
            {
                filteredData.push(element);
            }
        }
      });

      this.setState({data: filteredData});
    }
  }

  render()
  {
      if (!this.state.showLoading){
        return (
            <div>
                <nav className="z-depth-0">
                    <div className="nav-wrapper">
                        Most Accessed Url(s)
                    </div>
                </nav>
                <ReactTable data={this.state.data} columns={this.state.columns} onPageChange={this.handlePageChange.bind(this)} onFilter={this.handleFilter.bind(this)}/>

                {this.state.showApiError && (
                <div className="shorten-error">{this.state.apiError}</div>
                )}
            </div>
        )
      }
      else
      {
        return (
            <div className="loader">
              <div className="preloader-wrapper small active">
                <div className="spinner-layer spinner-green-only">
                  <div className="circle-clipper left">
                    <div className="circle" />
                  </div>
                  <div className="gap-patch">
                    <div className="circle" />
                  </div>
                  <div className="circle-clipper right">
                    <div className="circle" />
                  </div>
                </div>
              </div>
            </div>

            
          );
      }
  }
}

export default Urlvisit;